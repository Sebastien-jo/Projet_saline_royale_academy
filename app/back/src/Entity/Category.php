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
use Doctrine\DBAL\Types\Types;
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
    #[Groups(['work:read', 'masterclass_user:read:item', 'composer:read', 'masterclass:read', 'category:read', 'masterclass:read', 'masterclass:read:item', 'user:read:item'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'category', targetEntity: Work::class)]
    private Collection $works;

    #[ORM\ManyToMany(targetEntity: Composer::class, mappedBy: 'categories')]
    private Collection $composers;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['work:read', 'masterclass_user:read:item', 'composer:read', 'masterclass:read', 'category:read'])]
    private ?string $description = null;

    public function __construct(array $array = [])
    {
        parent::__construct($array);
        $this->works = new ArrayCollection();
        $this->composers = new ArrayCollection();
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
