<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Translation\BadgeTranslation;
use App\Enum\BadgeCategory;
use App\Repository\BadgeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BadgeRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(
            normalizationContext: ['groups' => ['translations']],
            security: 'is_granted("BADGE_CREATE")'
        ),
        new Get(),
        new Patch(
            normalizationContext: ['groups' => ['translations']],
            security: 'is_granted("BADGE_EDIT")'
        ),
        new Delete(
            security: 'is_granted("BADGE_DELETE")'
        ),
    ],
    normalizationContext: ['groups' => ['badge:read']],
    denormalizationContext: ['groups' => ['badge:post:write']],
    filters: ['translation.groups'],
)]
class Badge extends AbstractEntityTranslator
{
    use IdentifiableTrait;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'badges')]
    private Collection $users;

    #[Groups(['badge:post:write', 'translations', 'badge:read'])]
    #[ORM\OneToMany(mappedBy: 'translatable', targetEntity: BadgeTranslation::class, cascade: ['persist'], fetch: 'EXTRA_LAZY', orphanRemoval: true)]
    protected Collection $translations;

    #[Groups(['badge:post:write', 'badge:read'])]
    #[ORM\Column(length: 255, enumType: BadgeCategory::class)]
    private BadgeCategory $category;

    #[ORM\OneToOne(mappedBy: 'Badge', cascade: ['persist'])]
    #[Groups(['badge:read'])]
    private ?BadgeImage $badgeImage = null;

    public function __construct($array = [])
    {
        parent::__construct($array);
        $this->users = new ArrayCollection();
        $this->translations = new ArrayCollection();
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addBadge($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeBadge($this);
        }

        return $this;
    }

    public function getCategory(): BadgeCategory
    {
        return $this->category;
    }

    public function setCategory(BadgeCategory $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getBadgeImage(): ?BadgeImage
    {
        return $this->badgeImage;
    }

    // Virtuals
    #[Groups(['badge:read'])]
    /* @phpstan-ignore-next-line */
    private string $name;

    #[Groups(['badge:read'])]
    /* @phpstan-ignore-next-line */
    private string $description;

    public function getName(): ?string
    {
        /** @var BadgeTranslation $translation */
        $translation = $this->getTranslation();

        return $translation->getName();
    }

    public function setName(string $name): self
    {
        /** @var BadgeTranslation $translation */
        $translation = $this->getTranslation();
        $translation->setName($name);

        return $this;
    }

    public function getDescription(): ?string
    {
        /** @var BadgeTranslation $translation */
        $translation = $this->getTranslation();

        return $translation->getDescription();
    }

    public function setDescription(string $description): self
    {
        /** @var BadgeTranslation $translation */
        $translation = $this->getTranslation();
        $translation->setDescription($description);

        return $this;
    }
}
