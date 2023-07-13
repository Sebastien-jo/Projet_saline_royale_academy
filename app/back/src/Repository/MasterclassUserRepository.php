<?php

namespace App\Repository;

use App\Entity\MasterclassUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MasterclassUser>
 *
 * @method MasterclassUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method MasterclassUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method MasterclassUser[]    findAll()
 * @method MasterclassUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MasterclassUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MasterclassUser::class);
    }

    public function save(MasterclassUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(MasterclassUser $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
