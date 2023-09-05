<?php

namespace App\Repository;

use App\Entity\Composer;
use App\Entity\Favorites\FavoritesComposer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Composer>
 *
 * @method Composer|null find($id, $lockMode = null, $lockVersion = null)
 * @method Composer|null findOneBy(array $criteria, array $orderBy = null)
 * @method Composer[]    findAll()
 * @method Composer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ComposerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Composer::class);
    }

    public function save(Composer $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Composer $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return array<Composer>
     */
    public function FindAllWithFavorite(int $userId): array
    {
        $dql = '
            SELECT c
            FROM ' . Composer::class . ' c
            INNER JOIN ' . FavoritesComposer::class . ' f WITH c.id = f.composer AND f.user = :userId';

        return $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->getResult()
        ;
    }

    /**
     * @throws NonUniqueResultException
     */
    public function FindWithFavorite(int $id, int $userId): ?Composer
    {
        $dql = '
            SELECT c
            FROM ' . Composer::class . ' c
            INNER JOIN ' . FavoritesComposer::class . ' f WITH c.id = f.composer AND f.user = :userId
            WHERE c.id = :id
        ';

        return $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->setParameter('id', $id)
                ->getOneOrNullResult()
        ;
    }
}
