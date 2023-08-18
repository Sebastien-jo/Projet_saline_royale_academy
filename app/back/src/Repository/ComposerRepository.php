<?php

namespace App\Repository;

use App\Entity\Composer;
use App\Entity\Favorites\FavoritesComposer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
        $composersWithFavorites = [];
        $dql = '
            SELECT c,
            CASE WHEN (f.user = :userId AND c.id = f.composer) THEN true ELSE false END AS isFavorite
            FROM ' . Composer::class . ' c
            LEFT JOIN ' . FavoritesComposer::class . ' f WITH c.id = f.composer AND f.user = :userId
        ';

        $results = $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->getResult()
        ;

        foreach ($results as $result) {
            $isFavorite = (bool) $result['isFavorite'];

            /** @var Composer $composer */
            $composer = $result[0];
            $composer->setIsFavorite($isFavorite);

            $composersWithFavorites[] = $composer;
        }

        return $composersWithFavorites;
    }

    public function FindWithFavorite(int $id, int $userId): ?Composer
    {
        $dql = '
            SELECT c,
            CASE WHEN (f.user = :userId AND c.id = f.composer) THEN true ELSE false END AS isFavorite
            FROM ' . Composer::class . ' c
            LEFT JOIN ' . FavoritesComposer::class . ' f WITH c.id = f.composer AND f.user = :userId
            WHERE c.id = :id
        ';

        $results = $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->setParameter('id', $id)
                ->getResult()
        ;
        foreach ($results as $result) {
            /** @var Composer $composer */
            $composer = $result[0];
            $isFavorite = $result['isFavorite'];

            $composer->setIsFavorite($isFavorite); // Assuming you have a setter for the isFavorite property

            return $composer;
        }

        return null;
    }
}
