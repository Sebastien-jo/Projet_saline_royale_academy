<?php

namespace App\Repository;

use App\Entity\Favorites\FavoritesWork;
use App\Entity\Work;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
        $masterclassesWithFavorites = [];
        $dql = '
            SELECT w,
            CASE WHEN (f.user = :userId AND w.id = f.work) THEN true ELSE false END AS isFavorite
            FROM ' . Work::class . ' w
            LEFT JOIN ' . FavoritesWork::class . ' f WITH w.id = f.work AND f.user = :userId
        ';

        $results = $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->getResult()
        ;

        foreach ($results as $result) {
            $isFavorite = (bool) $result['isFavorite'];

            /** @var Work $masterclass */
            $masterclass = $result[0];
            $masterclass->setIsFavorite($isFavorite);

            $masterclassesWithFavorites[] = $masterclass;
        }

        return $masterclassesWithFavorites;
    }

    public function FindWithFavorite(int $id, int $userId): ?Work
    {
        $dql = '
            SELECT w,
            CASE WHEN (f.user = :userId AND w.id = f.work) THEN true ELSE false END AS isFavorite
            FROM ' . Work::class . ' w
            LEFT JOIN ' . FavoritesWork::class . ' f WITH w.id = f.work AND f.user = :userId
            WHERE w.id = :id
        ';

        $results = $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->setParameter('id', $id)
                ->getResult()
        ;
        foreach ($results as $result) {
            /** @var Work $work */
            $work = $result[0];
            $isFavorite = $result['isFavorite'];

            $work->setIsFavorite($isFavorite); // Assuming you have a setter for the isFavorite property

            return $work;
        }

        return null;
    }
}
