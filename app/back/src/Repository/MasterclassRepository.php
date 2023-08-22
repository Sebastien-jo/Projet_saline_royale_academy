<?php

namespace App\Repository;

use App\Entity\Favorites\FavoritesMasterclass;
use App\Entity\Masterclass;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Masterclass>
 *
 * @method Masterclass|null find($id, $lockMode = null, $lockVersion = null)
 * @method Masterclass|null findOneBy(array $criteria, array $orderBy = null)
 * @method Masterclass[]    findAll()
 * @method Masterclass[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MasterclassRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Masterclass::class);
    }

    public function save(Masterclass $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Masterclass $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return array<Masterclass>
     */
    public function findAllWithFavorite(int $userId): array
    {
        $dql = '
            SELECT m 
            FROM ' . Masterclass::class . ' m
            INNER JOIN ' . FavoritesMasterclass::class . ' f WITH m.id = f.masterclass AND f.user = :userId
        ';

        return $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->getResult()
        ;
    }

    /**
     * @throws NonUniqueResultException
     */
    public function findWithFavorite(int $id, int $userId): ?Masterclass
    {
        $dql = '
            SELECT m
            FROM ' . Masterclass::class . ' m
            INNER JOIN ' . FavoritesMasterclass::class . ' f WITH m.id = f.masterclass AND f.user = :userId
            WHERE m.id = :id
        ';

        return $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->setParameter('id', $id)
                ->getOneOrNullResult()
        ;
    }
}
