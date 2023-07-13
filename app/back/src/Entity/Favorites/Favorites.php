<?php

namespace App\Entity\Favorites;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\User;
use App\Repository\FavoritesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\InheritanceType;

#[ORM\Entity(repositoryClass: FavoritesRepository::class)]
#[ApiResource]
#[InheritanceType('SINGLE_TABLE')]
#[ORM\DiscriminatorColumn(name: 'type', type: Types::STRING)]
#[ORM\DiscriminatorMap([
    'masterclass' => FavoritesMasterclass::class,
    'work' => FavoritesWork::class,
    'composer' => FavoritesComposer::class,
])]
class Favorites
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'favorites')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
