<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\WorkRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: WorkRepository::class)]
#[ApiResource]
class Work extends AbstractEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'works')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?DateTimeInterface $date = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagePath = null;

    #[ORM\OneToMany(mappedBy: 'work', targetEntity: Masterclass::class)]
    private Collection $masterclasses;

    #[ORM\ManyToOne(inversedBy: 'works')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Composer $composer = null;

    public function __construct($array = [])
    {
        parent::__construct($array);
        $this->masterclasses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getDate(): ?DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): self
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    /**
     * @return Collection<int, Masterclass>
     */
    public function getMasterclasses(): Collection
    {
        return $this->masterclasses;
    }

    public function addMasterclass(Masterclass $masterclass): self
    {
        if (!$this->masterclasses->contains($masterclass)) {
            $this->masterclasses->add($masterclass);
            $masterclass->setWork($this);
        }

        return $this;
    }

    public function removeMasterclass(Masterclass $masterclass): self
    {
        // set the owning side to null (unless already changed)
        if ($this->masterclasses->removeElement($masterclass) && $masterclass->getWork() === $this) {
            $masterclass->setWork(null);
        }

        return $this;
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
