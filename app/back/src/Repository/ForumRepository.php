<?php

namespace App\Repository;

use App\Entity\Forum;
use App\Entity\Like;
use App\Entity\Masterclass;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Forum>
 *
 * @method Forum|null find($id, $lockMode = null, $lockVersion = null)
 * @method Forum|null findOneBy(array $criteria, array $orderBy = null)
 * @method Forum[]    findAll()
 * @method Forum[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ForumRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Forum::class);
    }

    public function save(Forum $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Forum $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return array<Masterclass>
     */
    public function findAllLiked(int $userId): array
    {
        $dql = '
            SELECT f 
            FROM ' . Forum::class . ' f
            INNER JOIN ' . Like::class . ' l WITH f.id = l.forum AND l.user = :userId';

        return $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->getResult()
        ;
    }

    /**
     * @throws NonUniqueResultException
     */
    public function findLiked(int $id, int $userId): ?Forum
    {
        $dql = '
            SELECT f
            FROM ' . Forum::class . ' f
            INNER JOIN ' . Like::class . ' l WITH f.id = l.forum AND l.user = :userId
            WHERE f.id = :id
        ';

        return $this->getEntityManager()->createQuery($dql)
                ->setParameter('userId', $userId)
                ->setParameter('id', $id)
                ->getOneOrNullResult()
        ;
    }
}
