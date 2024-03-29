<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\ForumMessageRepository;
use App\State\ForumMessageStateProcessor;
use App\State\ForumMessageStateProvider;
use App\Validator\AdminGroupsGenerator;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: ForumMessageRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(
            uriTemplate: '/forums/{id}/messages.{_format}',
            uriVariables: [
                'id' => new Link(
                    fromProperty: 'forumMessages',
                    fromClass: Forum::class
                ),
            ],
        ),
        new Post(uriTemplate: '/forum_messages'),
    ],
    normalizationContext: ['groups' => ['forum:message:read', 'timestamp']],
    denormalizationContext: ['groups' => ['forum:message:write']],
    validationContext: ['groups' => AdminGroupsGenerator::class],
    provider: ForumMessageStateProvider::class,
    processor: ForumMessageStateProcessor::class
)]
class ForumMessage extends AbstractEntity
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['forum:message:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['forum:message:read', 'forum:message:write'])]
    #[Assert\NotBlank(message: 'Champ obligatoire', allowNull: false, groups: ['user:write'])]
    private ?string $content = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['forum:message:read', 'admin:write'])]
    #[Assert\NotBlank(message: 'Champ obligatoire', allowNull: false, groups: ['admin:write'])]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: self::class, cascade: ['persist', 'remove'])]
    #[Groups(['forum:message:write'])]
    #[Assert\NotBlank(message: 'Champ obligatoire', allowNull: true, groups: ['user:write'])]
    private ?self $parent = null;

    #[ORM\ManyToOne(inversedBy: 'forumMessages')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['forum:message:write'])]
    private ?Forum $forum = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): self
    {
        $this->parent = $parent;

        return $this;
    }

    public function getForum(): ?Forum
    {
        return $this->forum;
    }

    public function setForum(?Forum $forum): self
    {
        $this->forum = $forum;

        return $this;
    }

    /**
     * @return ForumMessage[]
     */
    #[Groups(['forum:message:read'])]
    public function getChildMessages(): array
    {
        $children = [];
        $forum = $this->getForum();

        if (!$forum instanceof \App\Entity\Forum) {
            return $children;
        }
        foreach ($forum->getForumMessages() as $message) {
            if ($message->getParent() === $this) {
                $children[] = $message;
            }
        }

        return $children;
    }
}
