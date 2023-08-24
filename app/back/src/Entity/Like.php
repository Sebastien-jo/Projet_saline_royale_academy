<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\LikeRepository;
use App\State\LikeProcessor;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LikeRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ORM\Table(name: '`like`')]
#[ApiResource(
    uriTemplate: ' forums/{id}/likes',
    operations: [
        new GetCollection(),
        new Post(processor: LikeProcessor::class),
        new Delete(processor: LikeProcessor::class),
    ],
    uriVariables: [
        'id' => new Link(
            fromProperty: 'likes',
            fromClass: Forum::class
        ),
    ],
    normalizationContext: ['groups' => ['like:read', 'timestamp']],
    denormalizationContext: ['groups' => ['like:write']],
    validationContext: ['groups' => ['Default']]
)]
class Like extends AbstractEntity
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'likes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['like:read'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'likes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Forum $forum = null;

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

    public function getForum(): ?Forum
    {
        return $this->forum;
    }

    public function setForum(?Forum $forum): static
    {
        $this->forum = $forum;

        return $this;
    }
}
