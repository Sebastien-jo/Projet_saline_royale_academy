<?php

namespace App\Repository;

use App\Entity\Favorites\FavoritesMasterclass;
use App\Entity\Masterclass;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
    public function FindAllWithFavorite(int $userId): array
    {
        $masterclassesWithFavorites = [];
        $dql = '
            SELECT m,
            CASE WHEN (f.user = :userId AND m.id = f.masterclass) THEN true ELSE false END AS isFavorite
            FROM ' . Masterclass::class . ' m
            LEFT JOIN ' . FavoritesMasterclass::class . ' f WITH m.id = f.masterclass AND f.user = :userId
        ';

        $results = $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->getResult()
        ;

        foreach ($results as $result) {
            $isFavorite = (bool) $result['isFavorite'];

            /** @var Masterclass $masterclass */
            $masterclass = $result[0];
            $masterclass->setIsFavorite($isFavorite);

            $masterclassesWithFavorites[] = $masterclass;
        }

        return $masterclassesWithFavorites;
    }

    public function FindWithFavorite(int $id, int $userId): ?Masterclass
    {
        $dql = '
            SELECT m,
            CASE WHEN (f.user = :userId AND m.id = f.masterclass) THEN true ELSE false END AS isFavorite
            FROM ' . Masterclass::class . ' m
            LEFT JOIN ' . FavoritesMasterclass::class . ' f WITH m.id = f.masterclass AND f.user = :userId
            WHERE m.id = :id
        ';

        $results = $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->setParameter('id', $id)
                ->getResult()
        ;
        foreach ($results as $result) {
            /** @var Masterclass $masterclass */
            $masterclass = $result[0];
            $isFavorite = $result['isFavorite'];

            $masterclass->setIsFavorite($isFavorite); // Assuming you have a setter for the isFavorite property

            return $masterclass;
        }

        return null;
    }
}
