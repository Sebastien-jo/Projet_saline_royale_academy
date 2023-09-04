<?php

namespace App\Repository;

use App\Entity\ComposerImage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ComposerImage>
 *
 * @method ComposerImage|null find($id, $lockMode = null, $lockVersion = null)
 * @method ComposerImage|null findOneBy(array $criteria, array $orderBy = null)
 * @method ComposerImage[]    findAll()
 * @method ComposerImage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ComposerImageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ComposerImage::class);
    }
}
