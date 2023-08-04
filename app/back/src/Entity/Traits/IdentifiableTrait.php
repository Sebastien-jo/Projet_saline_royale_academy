<?php

declare(strict_types=1);

namespace App\Entity\Traits;

use ApiPlatform\Metadata\ApiProperty;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait IdentifiableTrait
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['id'])]
    private ?int $id = null;

    public function getId(): ?int
    {
        return $this->id;
    }
}
