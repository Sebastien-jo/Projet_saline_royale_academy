<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Enum\Nationality;
use App\Repository\ComposerRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ComposerRepository::class)]
#[ApiResource(
    operations: [
        new Post(
            security: "is_granted('COMPOSER_CREATE')",
            securityMessage: 'Only admin can create a composer'
        ),
        new Delete(
            security: "is_granted('COMPOSER_DELETE', object)",
            securityMessage: 'Only admin can delete a composer',
        ),
        new Put(securityPostDenormalize: "is_granted('COMPOSER_EDIT')"),
        new Get(security: "is_granted('COMPOSER_VIEW')"),
        new GetCollection(security: "is_granted('COMPOSER_VIEW_LIST')"),
    ],
    normalizationContext: ['groups' => ['composer:read']],
    denormalizationContext: ['groups' => ['composer:create']]
)]
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
    #[Groups(['composer:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(groups: ['import', 'Default'])]
    #[Groups(['composer:read', 'composer:create'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(allowNull: false, groups: ['import', 'Default'])]
    #[Groups(['composer:read', 'composer:create'])]
    private ?string $completeName = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['composer:read', 'composer:create'])]
    #[Assert\Url(groups: ['import', 'Default'])]
    private ?string $picture = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['composer:read', 'composer:create'])]
    #[Assert\Url(groups: ['import', 'Default'])]
    private ?string $description = null;

    #[ORM\Column(type: 'date')]
    #[Groups(['composer:read', 'composer:create'])]
    #[Assert\NotBlank(allowNull: false, groups: ['import', 'Default'])]
    #[Context(normalizationContext: ['datetime_format' => 'Y-m-d'])]
    private DateTimeInterface $birth;

    #[ORM\Column(type: 'date')]
    #[Assert\NotBlank(allowNull: false, groups: ['import', 'Default'])]
    #[Groups(['composer:read', 'composer:create'])]
    #[Context(normalizationContext: ['datetime_format' => 'Y-m-d'])]
    private DateTimeInterface $death;

    #[ORM\Column(length: 255, nullable: true, enumType: Nationality::class)]
    #[Assert\NotBlank(allowNull: true, groups: ['import', 'Default'])]
    #[Groups(['composer:read', 'composer:create'])]
    private Nationality $nationality;

    #[ORM\OneToMany(mappedBy: 'composer', targetEntity: Work::class)]
    private Collection $works;

    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'composers')]
    private Collection $categories;

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

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): void
    {
        $this->picture = $picture;
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

    public function getNationality(): Nationality
    {
        return $this->nationality;
    }

    public function setNationality(Nationality $nationality): void
    {
        $this->nationality = $nationality;
    }
}
