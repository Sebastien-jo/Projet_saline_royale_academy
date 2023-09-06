<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\ForumRepository;
use App\State\ForumProvider;
use App\State\SetUserProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ForumRepository::class)]
#[hasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Delete(
            security: "is_granted('FORUM_DELETE',object)",
            securityMessage: 'Vous n\'avez pas accès à ce forum'
        ),
        new Get(
            security: "is_granted('FORUM_VIEW',object)",
            securityMessage: 'Vous n\'avez pas accès à ce forum',
            provider: ForumProvider::class
        ),
        new GetCollection(
            security: "is_granted('FORUM_VIEW_LIST')",
            securityMessage: 'Vous n\'avez pas accès à ce forum',
            provider: ForumProvider::class
        ),
        new Post(
            uriTemplate: 'admin/forums',
            denormalizationContext: ['groups' => ['admin:write', 'forum:write']],
            security: 'is_granted("ADMIN:FORUM_CREATE")',
            securityMessage: 'Accès refusé',
            validationContext: ['groups' => ['Default', 'admin:write', 'forum:write']],
        ),
        new Post(
            uriTemplate: ' forums/{id}/likes',
            uriVariables: [
                'id' => new Link(
                    toProperty: 'user',
                    fromClass: MasterclassUser::class
                ),
            ],
        ),
        new Post(
            security: "is_granted('FORUM_CREATE')",
            securityMessage: 'Vous devez être connecté pour créer un forum',
            validationContext: ['groups' => ['Default', 'forum:write']],
            processor: SetUserProcessor::class
        ), new Put(
            denormalizationContext: ['groups' => ['forum:edit']],
            securityPostDenormalize: "is_granted('FORUM_EDIT')",
            securityPostDenormalizeMessage: 'Vous n\'avez pas les droits pour modifier ce forum',
            validationContext: ['groups' => ['Default']]
        ),
    ],
    normalizationContext: ['groups' => ['forum:read', 'timestamp']],
    denormalizationContext: ['groups' => ['forum:write']]
)]
class Forum extends AbstractEntity
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['forum:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[Groups(['admin:write', 'forum:read'])]
    #[Assert\NotBlank(message: 'Champ obligatoire', allowNull: false, groups: ['admin:write'])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'forum', targetEntity: ForumMessage::class, orphanRemoval: true)]
    #[Groups(['forum:read'])]
    private Collection $forumMessages;

    #[ORM\Column]
    #[Groups(['admin:write', 'forum:edit', 'forum:read'])]
    private ?bool $isClosed = false;

    #[ORM\OneToMany(mappedBy: 'forum', targetEntity: Like::class)]
    private Collection $likes;

    #[ORM\Column(length: 255)]
    #[Groups(['forum:read', 'forum:write', 'admin:write', 'forum:edit'])]
    #[Assert\NotBlank(message: 'Champ obligatoire', allowNull: false)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['forum:read', 'forum:write', 'admin:write'])]
    #[Assert\NotBlank(message: 'Champ obligatoire', allowNull: false)]
    private ?string $title = null;

    #[Groups(['forum:read'])]
    private bool $isLiked = false;

    public function __construct($array = [])
    {
        parent::__construct($array);
        $this->forumMessages = new ArrayCollection();
        $this->likes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, ForumMessage>
     */
    public function getForumMessages(): Collection
    {
        return $this->forumMessages;
    }

    public function addForumMessage(ForumMessage $forumMessage): self
    {
        if (!$this->forumMessages->contains($forumMessage)) {
            $this->forumMessages->add($forumMessage);
            $forumMessage->setForum($this);
        }

        return $this;
    }

    public function removeForumMessage(ForumMessage $forumMessage): self
    {
        // set the owning side to null (unless already changed)
        if ($this->forumMessages->removeElement($forumMessage) && $forumMessage->getForum() === $this) {
            $forumMessage->setForum(null);
        }

        return $this;
    }

    public function isIsClosed(): ?bool
    {
        return $this->isClosed;
    }

    public function setIsClosed(bool $isClosed): static
    {
        $this->isClosed = $isClosed;

        return $this;
    }

    /**
     * @return Collection<int, Like>
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): static
    {
        if (!$this->likes->contains($like)) {
            $this->likes->add($like);
            $like->setForum($this);
        }

        return $this;
    }

    public function removeLike(Like $like): static
    {
        // set the owning side to null (unless already changed)
        if ($this->likes->removeElement($like) && $like->getForum() === $this) {
            $like->setForum(null);
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getIsLiked(): bool
    {
        return $this->isLiked;
    }

    public function setIsLiked(bool $isLiked): static
    {
        $this->isLiked = $isLiked;

        return $this;
    }

    #[Groups(['forum:read'])]
    public function getCountLikes(): int
    {
        return $this->likes->count();
    }

    #[Groups(['forum:read'])]
    public function getCountMessages(): int
    {
        return $this->getForumMessages()->count();
    }
}
