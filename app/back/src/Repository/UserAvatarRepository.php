<?php

namespace App\Repository;

use App\Entity\UserAvatar;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserAvatar>
 *
 * @method UserAvatar|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserAvatar|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserAvatar[]    findAll()
 * @method UserAvatar[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserAvatarRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserAvatar::class);
    }

    public function save(UserAvatar $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(UserAvatar $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
