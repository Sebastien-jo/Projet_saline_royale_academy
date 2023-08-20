<?php

namespace App\Entity\Favorites;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use App\Entity\Composer;
use App\State\SetUserProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity()]
#[ApiResource(
    operations: [
        new Post(
            validationContext: ['groups' => ['favorites_composer:write']],
            processor: SetUserProcessor::class
        ),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['favorites_composer:read']],
    denormalizationContext: ['groups' => ['favorites_composer:write']]
)]
#[UniqueEntity(fields: [
    'user', 'composer',
], message: 'This composer is already in your favorites', errorPath: 'composer', groups: ['favorites_composer:write'])]
class FavoritesComposer extends Favorites
{
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['favorites:read', 'favorites_composer:write'])]
    #[Assert\NotBlank(allowNull: false, groups: ['favorites_composer:write'])]
    private ?Composer $composer = null;

    public function getType(): string
    {
        return 'composer';
    }

    public function getComposer(): ?Composer
    {
        return $this->composer;
    }

    public function setComposer(?Composer $composer): static
    {
        $this->composer = $composer;

        return $this;
    }
}
