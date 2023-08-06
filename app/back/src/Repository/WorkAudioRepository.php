<?php

namespace App\Repository;

use App\Entity\WorkAudio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<WorkAudio>
 *
 * @method WorkAudio|null find($id, $lockMode = null, $lockVersion = null)
 * @method WorkAudio|null findOneBy(array $criteria, array $orderBy = null)
 * @method WorkAudio[]    findAll()
 * @method WorkAudio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorkAudioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WorkAudio::class);
    }

    public function save(WorkAudio $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(WorkAudio $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}
