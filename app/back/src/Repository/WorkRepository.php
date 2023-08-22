<?php

namespace App\Repository;

use App\Entity\Favorites\FavoritesWork;
use App\Entity\Work;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Work>
 *
 * @method Work|null find($id, $lockMode = null, $lockVersion = null)
 * @method Work|null findOneBy(array $criteria, array $orderBy = null)
 * @method Work[]    findAll()
 * @method Work[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorkRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Work::class);
    }

    public function save(Work $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Work $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return array<Work>
     */
    public function FindAllWithFavorite(int $userId): array
    {
        $dql = '
            SELECT w
            FROM ' . Work::class . ' w
            INNER JOIN ' . FavoritesWork::class . ' f WITH w.id = f.work AND f.user = :userId';

        return $this->getEntityManager()->createQuery($dql)
               ->setParameter('userId', $userId)
               ->getResult()
        ;
    }

    /**
     * @throws NonUniqueResultException
     */
    public function FindWithFavorite(int $id, int $userId): ?Work
    {
        $dql = '
            SELECT w
            FROM ' . Work::class . ' w
            INNER JOIN ' . FavoritesWork::class . ' f WITH w.id = f.work AND f.user = :userId
            WHERE w.id = :id
        ';

        return $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->setParameter('id', $id)
                ->getOneOrNullResult()
        ;
    }
}
