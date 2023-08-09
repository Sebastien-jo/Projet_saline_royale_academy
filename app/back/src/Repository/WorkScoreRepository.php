<?php

namespace App\Repository;

use App\Entity\WorkScore;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<WorkScore>
 *
 * @method WorkScore|null find($id, $lockMode = null, $lockVersion = null)
 * @method WorkScore|null findOneBy(array $criteria, array $orderBy = null)
 * @method WorkScore[]    findAll()
 * @method WorkScore[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorkScoreRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WorkScore::class);
    }

    public function save(WorkScore $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(WorkScore $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
