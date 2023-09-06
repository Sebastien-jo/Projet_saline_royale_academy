<?php

namespace App\Entity\Favorites;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Entity\User;
use App\Filter\DiscriminatorFilter;
use App\Repository\FavoritesRepository;
use App\State\SetUserProcessor;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\InheritanceType;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FavoritesRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['favorites:read', 'work:read', 'composer:read', 'masterclass:read']]),
        new Post(processor: SetUserProcessor::class),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['favorites:read']],
    denormalizationContext: ['groups' => ['favorites:write']]
)]
#[InheritanceType('SINGLE_TABLE')]
#[ORM\DiscriminatorColumn(name: 'type', type: Types::STRING)]
#[ORM\DiscriminatorMap([
    'masterclass' => FavoritesMasterclass::class,
    'work' => FavoritesWork::class,
    'composer' => FavoritesComposer::class,
])]
#[ApiFilter(DiscriminatorFilter::class, properties: ['type'])]
class Favorites
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'favorites')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['favorites:read', 'admin:write'])]
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
