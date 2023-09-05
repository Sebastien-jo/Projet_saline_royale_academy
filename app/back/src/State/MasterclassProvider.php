<?php

namespace App\State;

use ApiPlatform\Doctrine\Orm\Extension\QueryResultCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGenerator;
use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Masterclass;
use App\Entity\User;
use App\Repository\MasterclassRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Bundle\SecurityBundle\Security;

readonly class MasterclassProvider implements ProviderInterface
{
    public function __construct(
        private Security $security,
        private EntityManagerInterface $entityManager,
        private mixed $collectionExtensions
    ) {
    }

    /**
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @return object|array<Masterclass>|null
     *
     * @throws NonUniqueResultException
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $favoritesMasterclass = null;
        $startedMasterclass = null;
        /**
         * @var User $user
         */
        $user = $this->security->getUser();
        /**
         * @var int $id
         */
        $id = $uriVariables['id'] ?? null;
        /**
         * @var MasterclassRepository $masterclassRepository
         */
        $masterclassRepository = $this->entityManager->getRepository(Masterclass::class);
        $queryBuilder = $masterclassRepository->createQueryBuilder('m');
        $queryNameGenerator = new QueryNameGenerator();

        if ($operation instanceof CollectionOperationInterface) {
            if ($user->getId() !== null) {
                $favoritesMasterclass = $masterclassRepository->findAllWithFavorite($user->getId());
                $startedMasterclass = $masterclassRepository->findMasterclassesStardedByUser($user->getId());
            }
            //                Filters ApiPlatform
            foreach ($this->collectionExtensions as $extension) {
                $extension->applyToCollection($queryBuilder, $queryNameGenerator, $operation->getClass(), $operation, $context);
                //            Pagination
                if ($extension instanceof QueryResultCollectionExtensionInterface && $extension->supportsResult($operation->getClass() ?? '', $operation, $context)) {
                    $queryResults = $extension->getResult($queryBuilder, $operation->getClass(), $operation, $context);
                    /**
                     * @var Masterclass $masterclass
                     */
                    foreach ($queryResults as $masterclass) {
                        $masterclass->setFavorite(in_array($masterclass, (array) $favoritesMasterclass, true));
                        $masterclass->setStarted(in_array($masterclass, (array) $startedMasterclass, true));
                        $result[] = $masterclass;
                    }

                    return $result ?? null;
                }
            }

            $queryResults = $queryBuilder->getQuery()->getResult();

            if ($favoritesMasterclass == null && $startedMasterclass == null) {
                return $queryResults;
            }

            foreach ($queryResults as $masterclass) {
                $masterclass->setFavorite(in_array($masterclass, (array) $favoritesMasterclass, true));
                $masterclass->setStarted(in_array($masterclass, (array) $startedMasterclass, true));
                $result[] = $masterclass;
            }

            return $result ?? null;
        } else {
            $masterclass = $masterclassRepository->find($id);

            if ($user->getId()) {
                $queryResult = $masterclassRepository->findWithFavorite($id, $user->getId());
                if ($queryResult === $masterclass) {
                    $masterclass?->setFavorite(true);
                }

                $queryResult = $masterclassRepository->findOneMasterclassStartedByUser($id, $user->getId());
                if ($queryResult === $masterclass) {
                    $masterclass?->setStarted(true);
                }
            }

            return $masterclass ?? null;
        }
    }
}
