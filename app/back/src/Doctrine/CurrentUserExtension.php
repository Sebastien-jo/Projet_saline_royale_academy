<?php

namespace App\Doctrine;

// methode de customisation de requepet non prioritaire sur un custom data provider !!!!
use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Favorites\Favorites;
use App\Entity\Favorites\FavoritesComposer;
use App\Entity\Favorites\FavoritesMasterclass;
use App\Entity\Favorites\FavoritesWork;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;

final readonly class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    public function __construct(
        private Security $security,
    ) {
    }

    /**
     * @param array<mixed> $context
     */
    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        Operation $operation = null,
        array $context = []
    ): void {
        $operationName = $operation?->getName();

        if (preg_match('/SELF_\d+/', (string) $operationName) === 1) {
            switch ($resourceClass) {
                case FavoritesComposer::class:
                case FavoritesMasterclass::class:
                case FavoritesWork::class:
                case Favorites::class:
                    $this->addWhereCurrentUser($queryBuilder, 'user');
                    break;
                default:
                    $this->addWhereCurrentUser($queryBuilder);

                    break;
            }
        } elseif ($operationName === 'MANAGE') {
            $this->addWhereCurrentTeacherFromMasterclass($queryBuilder);
        }
    }

    private function addWhereCurrentUser(QueryBuilder $queryBuilder, string $columName = 'user'): void
    {
        /** @var User|null $user */
        $user = $this->security->getUser();
        if (
            $this->security->isGranted('ROLE_ADMIN')
            || !$user instanceof User) {
            return;
        }
        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.%s = :current_user', $rootAlias, $columName));
        $queryBuilder->setParameter(':current_user', $user->getId());
    }

    private function addWhereCurrentTeacherFromMasterclass(QueryBuilder $queryBuilder): void
    {
        /** @var User|null $user */
        $user = $this->security->getUser();
        if (
            $this->security->isGranted('ROLE_ADMIN')
            || !$user instanceof User
        ) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->innerJoin($rootAlias . '.masterclass', 'm');
        $queryBuilder->andWhere(sprintf('m.%s = :current_user', 'teacher'));
        $queryBuilder->setParameter(':current_user', $user->getId());
    }

    /**
     * @param array<mixed> $identifiers
     * @param array<mixed> $context
     */
    public function applyToItem(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        array $identifiers,
        Operation $operation = null,
        array $context = []
    ): void {
        $operationName = $operation?->getName();
        if ($operationName === 'api:user:stat') {
            $this->addWhereCurrentUser($queryBuilder, 'id');
            $queryBuilder->setMaxResults(1);
        }
    }
}
