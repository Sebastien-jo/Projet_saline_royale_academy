<?php

namespace App\Repository;

use App\Entity\Favorites\Favorites;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Favorites>
 *
 * @method Favorites|null find($id, $lockMode = null, $lockVersion = null)
 * @method Favorites|null findOneBy(array $criteria, array $orderBy = null)
 * @method Favorites[]    findAll()
 * @method Favorites[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FavoritesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Favorites::class);
    }

    public function save(Favorites $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Favorites $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
