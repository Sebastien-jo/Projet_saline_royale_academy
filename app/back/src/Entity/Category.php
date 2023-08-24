<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
    ],
    normalizationContext: ['groups' => ['category:read', 'id', 'timestamp']]
)]
class Category extends AbstractEntity
{
    use IdentifiableTrait;
    use TimestampableTrait;

    #[ORM\Column(length: 255)]
    #[Groups(['work:read', 'masterclass_user:read:item', 'composer:read', 'masterclass:read', 'category:read'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Work::class)]
    private Collection $works;

    #[ORM\ManyToMany(targetEntity: Composer::class, mappedBy: 'categories')]
    private Collection $composers;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Masterclass::class)]
    private Collection $masterclasses;

    public function __construct(array $array = [])
    {
        parent::__construct($array);
        $this->works = new ArrayCollection();
        $this->composers = new ArrayCollection();
        $this->masterclasses = new ArrayCollection();
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

    /**
     * @return Collection<int, Work>
     */
    public function getWorks(): Collection
    {
        return $this->works;
    }

    public function addWork(Work $work): self
    {
        if (!$this->works->contains($work)) {
            $this->works->add($work);
            $work->setCategory($this);
        }

        return $this;
    }

    public function removeWork(Work $work): self
    {
        // set the owning side to null (unless already changed)
        if ($this->works->removeElement($work) && $work->getCategory() === $this) {
            $work->setCategory(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, Composer>
     */
    public function getComposers(): Collection
    {
        return $this->composers;
    }

    public function addComposer(Composer $composer): static
    {
        if (!$this->composers->contains($composer)) {
            $this->composers->add($composer);
            $composer->addCategory($this);
        }

        return $this;
    }

    public function removeComposer(Composer $composer): static
    {
        if ($this->composers->removeElement($composer)) {
            $composer->removeCategory($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Masterclass>
     */
    public function getMasterclasses(): Collection
    {
        return $this->masterclasses;
    }

    public function addMasterclass(Masterclass $masterclass): static
    {
        if (!$this->masterclasses->contains($masterclass)) {
            $this->masterclasses->add($masterclass);
            $masterclass->setCategory($this);
        }

        return $this;
    }

    public function removeMasterclass(Masterclass $masterclass): static
    {
        // set the owning side to null (unless already changed)
        if ($this->masterclasses->removeElement($masterclass) && $masterclass->getCategory() === $this) {
            $masterclass->setCategory(null);
        }

        return $this;
    }
}
