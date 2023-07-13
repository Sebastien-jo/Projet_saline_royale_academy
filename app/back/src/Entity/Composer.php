<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ComposerRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: ComposerRepository::class)]
#[ApiResource]
#[uniqueEntity(
    fields: ['name', 'completeName'],
    message: 'Name already use',
    groups: ['import', 'Default']
)]
class Composer extends AbstractEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $completeName = null;

    #[ORM\Column(length: 255)]
    private ?string $portrait = null;

    #[ORM\Column(type: 'date')]
    private DateTimeInterface $birth;

    #[ORM\Column(type: 'date')]
    private DateTimeInterface $death;

    #[ORM\OneToMany(mappedBy: 'composer', targetEntity: Work::class)]
    private Collection $works;

    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'composers')]
    private Collection $categories;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    public function __construct()
    {
        parent::__construct();
        $this->works = new ArrayCollection();
        $this->categories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getCompleteName(): ?string
    {
        return $this->completeName;
    }

    public function setCompleteName(string $completeName): self
    {
        $this->completeName = $completeName;

        return $this;
    }

    public function getPortrait(): ?string
    {
        return $this->portrait;
    }

    public function setPortrait(?string $portrait): void
    {
        $this->portrait = $portrait;
    }

    public function getBirth(): DateTimeInterface
    {
        return $this->birth;
    }

    public function setBirth(DateTimeInterface $birth): void
    {
        $this->birth = $birth;
    }

    public function getDeath(): DateTimeInterface
    {
        return $this->death;
    }

    public function setDeath(DateTimeInterface $death): void
    {
        $this->death = $death;
    }

    /**
     * @return Collection<int, Work>
     */
    public function getWorks(): Collection
    {
        return $this->works;
    }

    public function addWork(Work $work): static
    {
        if (!$this->works->contains($work)) {
            $this->works->add($work);
            $work->setComposer($this);
        }

        return $this;
    }

    public function removeWork(Work $work): static
    {
        // set the owning side to null (unless already changed)
        if ($this->works->removeElement($work) && $work->getComposer() === $this) {
            $work->setComposer(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        $this->categories->removeElement($category);

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }
}
