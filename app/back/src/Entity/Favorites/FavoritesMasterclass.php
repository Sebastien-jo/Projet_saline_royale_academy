<?php

namespace App\Entity\Favorites;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use App\Entity\Masterclass;
use App\State\SetUserProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity()]
#[ApiResource(
    operations: [
        new Post(
            validationContext: ['groups' => ['favorites_masterclass:write']],
            processor: SetUserProcessor::class
        ),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['favorites_masterclass:read']],
    denormalizationContext: ['groups' => ['favorites_masterclass:write']]
)]
#[UniqueEntity(fields: ['user', 'masterclass'], groups: ['favorites_masterclass:write'])]
class FavoritesMasterclass extends Favorites
{
    #[ORM\ManyToOne(inversedBy: 'favoritesMasterclasses')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['favorites:read', 'favorites_masterclass:write'])]
    #[Assert\NotBlank(allowNull: false, groups: ['favorites_composer:write'])]
    private ?Masterclass $masterclass = null;

    public function getType(): string
    {
        return 'masterclass';
    }

    public function getMasterclass(): ?Masterclass
    {
        return $this->masterclass;
    }

    public function setMasterclass(?Masterclass $masterclass): static
    {
        $this->masterclass = $masterclass;

        return $this;
    }
}
