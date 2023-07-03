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
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BadgeRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Patch(normalizationContext: ['groups' => ['translations']]),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['badge:read']],
    denormalizationContext: ['groups' => ['badge:post:write']],
    filters: ['translation.groups'],
)]
class Badge extends AbstractEntity
{
    use IdentifiableTrait;

    #[Groups(['badge:post:write', 'badge:read'])]
    #[ORM\Column(type: Types::STRING, length: 255, nullable: false)]
    private string $imagePath;

    #[Groups(['badge:post:write', 'badge:read'])]
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'badges')]
    private Collection $users;

    #[Groups(['badge:post:write', 'translations'])]
    #[ORM\OneToMany(mappedBy: 'translatable', targetEntity: BadgeTranslation::class, cascade: ['persist'], fetch: 'EXTRA_LAZY', orphanRemoval: true)]
    protected Collection $translations;

    #[Groups(['badge:post:write', 'badge:read'])]
    #[ORM\Column(length: 255, enumType: BadgeCategory::class)]
    private BadgeCategory $category;

    public function __construct($array = [])
    {
        parent::__construct($array);
        $this->users = new ArrayCollection();
        $this->translations = new ArrayCollection();
    }

    public function getName(): ?string
    {
        /** @var BadgeTranslation $translation */
        $translation = $this->getTranslation('fr');

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
        $translation = $this->getTranslation('fr');

        return $translation->getDescription();
    }

    public function setDescription(string $description): self
    {
        /** @var BadgeTranslation $translation */
        $translation = $this->getTranslation();
        $translation->setDescription($description);

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): self
    {
        $this->imagePath = $imagePath;

        return $this;
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

    public function setCategory(BadgeCategory $catogry): self
    {
        $this->category = $catogry;

        return $this;
    }
}
