<?php

namespace App\Repository;

use App\Entity\SectionUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<SectionUser>
 *
 * @method SectionUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method SectionUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method SectionUser[]    findAll()
 * @method SectionUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SectionUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SectionUser::class);
    }

    public function save(SectionUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(SectionUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
