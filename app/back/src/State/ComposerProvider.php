<?php

namespace App\State;

use ApiPlatform\Doctrine\Orm\Extension\QueryResultCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGenerator;
use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Composer;
use App\Entity\User;
use App\Repository\WorkRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

readonly class ComposerProvider implements ProviderInterface
{
    public function __construct(private Security $security, private EntityManagerInterface $entityManager, private mixed $collectionExtensions)
    {
    }

    /**
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @return object|array<Composer>|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $favoritesComposer = null;
        /**
         * @var User $user
         */
        $user = $this->security->getUser();
        /**
         * @var int $id
         */
        $id = $uriVariables['id'] ?? null;
        /**
         * @var WorkRepository $composerRepository
         */
        $composerRepository = $this->entityManager->getRepository(Composer::class);
        $queryBuilder = $composerRepository->createQueryBuilder('c');
        $queryNameGenerator = new QueryNameGenerator();

        if ($operation instanceof CollectionOperationInterface) {
            if ($user->getId() !== null) {
                $favoritesComposer = $composerRepository->findAllWithFavorite($user->getId());
            }
            //                Filters ApiPlatform
            foreach ($this->collectionExtensions as $extension) {
                $extension->applyToCollection(
                    $queryBuilder,
                    $queryNameGenerator,
                    $operation->getClass(),
                    $operation,
                    $context
                );
                //            Pagination
                if ($extension instanceof QueryResultCollectionExtensionInterface && $extension->supportsResult($operation->getClass() ?? '', $operation, $context)) {
                    $queryResults = $extension->getResult($queryBuilder, $operation->getClass(), $operation, $context);
                    /**
                     * @var Composer $composer
                     */
                    foreach ($queryResults as $composer) {
                        $composer->setIsFavorite(in_array($composer, (array) $favoritesComposer, true));
                        $result[] = $composer;
                    }

                    return $result ?? null;
                }
            }

            $queryResults = $queryBuilder->getQuery()->getResult();

            if ($favoritesComposer == null) {
                return $queryResults;
            }
            foreach ($queryResults as $composer) {
                $composer->setIsFavorite(in_array($composer, $favoritesComposer, true));
                $result[] = $composer;
            }

            return $result ?? null;
        } else {
            $composer = $composerRepository->find($id);

            if ($user->getId()) {
                $queryResult = $composerRepository->findWithFavorite($id, $user->getId());
                if ($queryResult === $composer) {
                    $composer?->setIsFavorite(true);
                }
            }

            return $composer ?? null;
        }
    }
}
