<?php

namespace App\State;

use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryResultCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGenerator;
use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Forum;
use App\Entity\User;
use App\Repository\ForumRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

readonly class ForumProvider implements ProviderInterface
{
    /**
     * @param iterable<QueryCollectionExtensionInterface> $collectionExtensions
     */
    public function __construct(private Security $security, private EntityManagerInterface $entityManager, private iterable $collectionExtensions)
    {
    }

    /**
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @return object|array<Forum>|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $forumsLiked = null;
        /**
         * @var User $user
         */
        $user = $this->security->getUser();
        /**
         * @var int $id
         */
        $id = $uriVariables['id'] ?? null;
        /**
         * @var ForumRepository $forumRepository
         */
        $forumRepository = $this->entityManager->getRepository(Forum::class);
        $queryBuilder = $forumRepository->createQueryBuilder('f');
        $queryNameGenerator = new QueryNameGenerator();

        if ($operation instanceof CollectionOperationInterface) {
            if ($user->getId() !== null) {
                $forumsLiked = $forumRepository->findAllLiked($user->getId());
            }

            //                Filters ApiPlatform
            foreach ($this->collectionExtensions as $extension) {
                $extension->applyToCollection($queryBuilder, $queryNameGenerator, $operation->getClass() ?? '', $operation, $context);
                //            Pagination
                if ($extension instanceof QueryResultCollectionExtensionInterface && $extension->supportsResult($operation->getClass() ?? '', $operation, $context)) {
                    $queryResults = $extension->getResult($queryBuilder, $operation->getClass(), $operation, $context);
                    /**
                     * @var Forum $forum
                     */
                    foreach ($queryResults as $forum) {
                        $forum->setIsLiked(in_array($forum, (array) $forumsLiked));
                        $result[] = $forum;
                    }

                    return $result ?? null;
                }
            }

            $queryResults = $queryBuilder->getQuery()->getResult();

            if ($forumsLiked == null) {
                return $queryResults;
            }
            foreach ($queryResults as $forum) {
                $forum?->setIsLiked(in_array($forum, $forumsLiked));
                $result[] = $forum;
            }

            return $result ?? null;
        } else {
            $forum = $forumRepository->find($id);

            if ($user->getId()) {
                $queryResult = $forumRepository->findLiked($id, $user->getId());
                if ($queryResult === $forum) {
                    $forum?->setIsLiked(true);
                }
            }

            return $forum ?? null;
        }
    }
}
