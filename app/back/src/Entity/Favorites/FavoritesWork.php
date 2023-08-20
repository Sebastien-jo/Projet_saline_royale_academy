<?php

namespace App\Entity\Favorites;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use App\Entity\Work;
use App\State\SetUserProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity()]
#[ApiResource(
    operations: [
        new Post(
            validationContext: ['groups' => ['favorites_work:write']],
            processor: SetUserProcessor::class
        ),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['favorites_work:read']],
    denormalizationContext: ['groups' => ['favorites_work:write']]
)]
#[UniqueEntity(fields: ['user', 'work'], groups: ['favorites_work:write'])]
class FavoritesWork extends Favorites
{
    #[ORM\ManyToOne(inversedBy: 'favoritesWorks')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['favorites:read', 'favorites_work:write'])]
    #[Assert\NotBlank(allowNull: false, groups: ['favorites_work:write'])]
    private ?Work $work = null;

    public function getType(): string
    {
        return 'work';
    }

    public function getWork(): ?Work
    {
        return $this->work;
    }

    public function setWork(?Work $work): static
    {
        $this->work = $work;

        return $this;
    }
}
