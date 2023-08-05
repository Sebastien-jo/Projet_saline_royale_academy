<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Favorites\FavoritesMasterclass;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\MasterclassRepository;
use App\State\MasterclassProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[
    ORM\Entity(repositoryClass: MasterclassRepository::class)]
#[ApiResource(operations: [
    new Get(),
    new GetCollection(),
    new Delete(),
    new Put(),
    new Post(
        normalizationContext: [
            'groups' => ['masterclass:read'],
        ],
        denormalizationContext: ['groups' => ['masterclass:write']],
        security: "is_granted('ROLE_TEACHER') or is_granted('ROLE_ADMIN')",
        processor: MasterclassProcessor::class
    ),
])]
#[ORM\HasLifecycleCallbacks()]
class Masterclass extends AbstractEntity
{
    use IdentifiableTrait;
    use TimestampableTrait;
    use SoftDeleteableEntity;

    #[ORM\Column(length: 255)]
    #[Groups(['masterclass:read', 'masterclass:write'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'masterclasses')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['masterclass:read', 'masterclass:write'])]
    private ?Work $work = null;

    #[ORM\OneToMany(mappedBy: 'masterclass', targetEntity: Section::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['masterclass:read', 'masterclass:write'])]
    #[ApiProperty(readableLink: true, writableLink: false)]
    private Collection $sections;

    #[Groups(['masterclass:write'])]
    /* @phpstan-ignore-next-line */
    private Collection $sectionsContent;

    #[ORM\OneToMany(mappedBy: 'masterclass', targetEntity: MasterclassUser::class, orphanRemoval: true)]
    private Collection $users;

    #[ORM\ManyToOne(inversedBy: 'masterclasses')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['masterclass:read', 'admin:write'])]
    private ?User $teacher = null;

    #[ORM\OneToMany(mappedBy: 'masterclass', targetEntity: FavoritesMasterclass::class)]
    private Collection $favoritesMasterclasses;

    public function __construct(array $array = [])
    {
        parent::__construct($array);
        $this->sections = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->favoritesMasterclasses = new ArrayCollection();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getWork(): ?Work
    {
        return $this->work;
    }

    public function setWork(?Work $work): self
    {
        $this->work = $work;

        return $this;
    }

    /**
     * @return Collection<int, Section>
     */
    public function getSections(): Collection
    {
        return $this->sections;
    }

    public function addSection(Section $section): self
    {
        if (!$this->sections->contains($section)) {
            $this->sections->add($section);
            $section->setMasterclass($this);
        }

        return $this;
    }

    public function removeSection(Section $section): self
    {
        // set the owning side to null (unless already changed)
        if ($this->sections->removeElement($section) && $section->getMasterclass() === $this) {
            $section->setMasterclass(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, MasterclassUser>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUsers(MasterclassUser $users): static
    {
        if (!$this->users->contains($users)) {
            $this->users->add($users);
            $users->setMasterclass($this);
        }

        return $this;
    }

    public function removeUsers(MasterclassUser $users): static
    {
        // set the owning side to null (unless already changed)
        if ($this->users->removeElement($users) && $users->getMasterclass() === $this) {
            $users->setMasterclass(null);
        }

        return $this;
    }

    public function getTeacher(): ?User
    {
        return $this->teacher;
    }

    public function setTeacher(?User $teacher): static
    {
        $this->teacher = $teacher;

        return $this;
    }

    /**
     * @return Collection<int, FavoritesMasterclass>
     */
    public function getFavoritesMasterclasses(): Collection
    {
        return $this->favoritesMasterclasses;
    }

    public function addFavoritesMasterclass(FavoritesMasterclass $favoritesMasterclass): static
    {
        if (!$this->favoritesMasterclasses->contains($favoritesMasterclass)) {
            $this->favoritesMasterclasses->add($favoritesMasterclass);
            $favoritesMasterclass->setMasterclass($this);
        }

        return $this;
    }

    public function removeFavoritesMasterclass(FavoritesMasterclass $favoritesMasterclass): static
    {
        // set the owning side to null (unless already changed)
        if ($this->favoritesMasterclasses->removeElement($favoritesMasterclass) && $favoritesMasterclass->getMasterclass() === $this) {
            $favoritesMasterclass->setMasterclass(null);
        }

        return $this;
    }
}
