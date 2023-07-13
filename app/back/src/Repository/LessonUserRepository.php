<?php

namespace App\Repository;

use App\Entity\LessonUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LessonUser>
 *
 * @method LessonUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method LessonUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method LessonUser[]    findAll()
 * @method LessonUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LessonUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LessonUser::class);
    }

    public function save(LessonUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(LessonUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
