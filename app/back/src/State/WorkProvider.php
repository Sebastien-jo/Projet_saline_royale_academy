<?php

namespace App\State;

use ApiPlatform\Doctrine\Orm\Extension\QueryResultCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGenerator;
use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\User;
use App\Entity\Work;
use App\Repository\WorkRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

readonly class WorkProvider implements ProviderInterface
{
    public function __construct(private Security $security, private EntityManagerInterface $entityManager, private mixed $collectionExtensions)
    {
    }

    /**
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @return object|array<Work >|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $favoritesWork = null;
        /**
         * @var User $user
         */
        $user = $this->security->getUser();
        /**
         * @var int $id
         */
        $id = $uriVariables['id'] ?? null;
        /**
         * @var WorkRepository $workRepository
         */
        $workRepository = $this->entityManager->getRepository(Work::class);
        $queryBuilder = $workRepository->createQueryBuilder('w');
        $queryNameGenerator = new QueryNameGenerator();

        if ($operation instanceof CollectionOperationInterface) {
            if ($user->getId() !== null) {
                $favoritesWork = $workRepository->findAllWithFavorite($user->getId());
            }
            //                Filters ApiPlatform
            foreach ($this->collectionExtensions as $extension) {
                $extension->applyToCollection($queryBuilder, $queryNameGenerator, $operation->getClass(), $operation, $context);
                //            Pagination
                if ($extension instanceof QueryResultCollectionExtensionInterface && $extension->supportsResult($operation->getClass() ?? '', $operation, $context)) {
                    $queryResults = $extension->getResult($queryBuilder, $operation->getClass(), $operation, $context);
                    /**
                     * @var Work $work
                     */
                    foreach ($queryResults as $work) {
                        $work->setIsFavorite(in_array($work, (array) $favoritesWork, true));
                        $result[] = $work;
                    }

                    return $result ?? null;
                }
            }

            $queryResults = $queryBuilder->getQuery()->getResult();

            if ($favoritesWork == null) {
                return $queryResults;
            }
            foreach ($queryResults as $work) {
                $work->setIsFavorite(in_array($work, $favoritesWork, true));
                $result[] = $work;
            }

            return $result ?? null;
        } else {
            $work = $workRepository->find($id);

            if ($user->getId()) {
                $queryResult = $workRepository->findWithFavorite($id, $user->getId());
                if ($queryResult === $work) {
                    $work?->setIsFavorite(true);
                }
            }

            return $work ?? null;
        }
    }
}
