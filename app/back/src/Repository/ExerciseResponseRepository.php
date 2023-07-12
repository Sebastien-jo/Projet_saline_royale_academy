<?php

namespace App\Repository;

use App\Entity\ExerciseResponse;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ExerciseResponse>
 *
 * @method ExerciseResponse|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExerciseResponse|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExerciseResponse[]    findAll()
 * @method ExerciseResponse[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExerciseResponseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExerciseResponse::class);
    }

    public function save(ExerciseResponse $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ExerciseResponse $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
