<?php

namespace App\Repository;

use App\Entity\ForumMessage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ForumMessage>
 *
 * @method ForumMessage|null find($id, $lockMode = null, $lockVersion = null)
 * @method ForumMessage|null findOneBy(array $criteria, array $orderBy = null)
 * @method ForumMessage[]    findAll()
 * @method ForumMessage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ForumMessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ForumMessage::class);
    }

    public function save(ForumMessage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ForumMessage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return ForumMessage[]
     */
    public function finbByForumId(int $forumId): array
    {
        return $this->createQueryBuilder('fm')
                ->andWhere('fm.forum = :forumId')
                ->andWhere('fm.parent IS NULL')
                ->setParameter('forumId', $forumId)
                ->orderBy('fm.createdAt', 'ASC')
                ->getQuery()
                ->getResult()
        ;
    }
}
