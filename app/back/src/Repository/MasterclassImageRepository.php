<?php

namespace App\Repository;

use App\Entity\MasterclassImage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MasterclassImage>
 *
 * @method MasterclassImage|null find($id, $lockMode = null, $lockVersion = null)
 * @method MasterclassImage|null findOneBy(array $criteria, array $orderBy = null)
 * @method MasterclassImage[]    findAll()
 * @method MasterclassImage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MasterclassImageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MasterclassImage::class);
    }
}
