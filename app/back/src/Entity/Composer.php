<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Entity\Traits\TimestampableTrait;
use App\Enum\Nationality;
use App\Repository\ComposerRepository;
use App\State\ComposerProvider;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\HasLifecycleCallbacks]
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
        new Get(security: "is_granted('COMPOSER_VIEW')", provider: ComposerProvider::class),
        new GetCollection(security: "is_granted('COMPOSER_VIEW_LIST')", provider: ComposerProvider::class),
    ],
    normalizationContext: ['groups' => ['composer:read', 'timestamp']],
    denormalizationContext: ['groups' => ['composer:create']]
)]
#[uniqueEntity(
    fields: ['name', 'completeName'],
    message: 'Name already use',
    groups: ['import', 'Default']
)]
class Composer extends AbstractEntity
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['composer:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(groups: ['import', 'Default'])]
    #[Groups(['composer:read', 'composer:create', 'work:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(allowNull: false, groups: ['import', 'Default'])]
    #[Groups(['composer:read', 'composer:create', 'work:read'])]
    private ?string $completeName = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['composer:read', 'composer:create'])]
    #[Assert\Url(groups: ['import', 'Default'])]
    private ?string $description = null;

    #[ORM\Column(type: 'date')]
    #[Groups(['composer:read', 'composer:create', 'work:read'])]
    #[Assert\NotBlank(allowNull: false, groups: ['import', 'Default'])]
    #[Context(normalizationContext: [DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    private DateTimeInterface $birth;

    #[ORM\Column(type: 'date')]
    #[Assert\NotBlank(allowNull: false, groups: ['import', 'Default'])]
    #[Groups(['composer:read', 'composer:create', 'work:read'])]
    #[Context(normalizationContext: [DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    private DateTimeInterface $death;

    #[ORM\Column(length: 255, nullable: true, enumType: Nationality::class)]
    #[Assert\NotBlank(allowNull: true, groups: ['import', 'Default'])]
    #[Groups(['composer:read', 'composer:create'])]
    private Nationality $nationality;

    #[ORM\OneToMany(mappedBy: 'composer', targetEntity: Work::class, orphanRemoval: true)]
    private Collection $works;

    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'composers')]
    #[Groups(['composer:read', 'composer:create'])]
    private Collection $categories;

    #[Groups(['composer:read'])]
    private bool $isFavorite = false;

    #[ORM\OneToOne(mappedBy: 'composer', cascade: ['persist', 'remove'])]
    #[Groups(['composer:read'])]
    private ?ComposerImage $composerImage = null;

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

    public function setIsFavorite(bool $isFavorite): static
    {
        $this->isFavorite = $isFavorite;

        return $this;
    }

    public function getIsFavorite(): bool
    {
        return $this->isFavorite;
    }

    public function getComposerImage(): ?ComposerImage
    {
        return $this->composerImage;
    }

    public function setComposerImage(ComposerImage $composerImage): static
    {
        // set the owning side of the relation if necessary
        if ($composerImage->getComposer() !== $this) {
            $composerImage->setComposer($this);
        }

        $this->composerImage = $composerImage;

        return $this;
    }
}
