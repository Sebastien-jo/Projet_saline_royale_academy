<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\OpenApi\Model;
use App\Controller\Api\WorkController;
use App\Entity\Favorites\FavoritesWork;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\WorkRepository;
use App\State\WorkProvider;
use ArrayObject;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: WorkRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            controller: WorkController::class,
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'name' => [
                                        'type' => 'string',
                                    ],
                                    'category' => [
                                        'type' => 'string',
                                        'format' => 'iri',
                                        'example' => 'api/categories/2',
                                    ],
                                    'date' => [
                                        'type' => 'date',
                                    ],
                                    'composer' => [
                                        'type' => 'string',
                                        'format' => 'iri',
                                        'example' => 'api/composers/2',
                                    ],
                                    'description' => [
                                        'type' => 'string',
                                    ],
                                    'workAudio' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                    'workScores' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ])
                )
            ),
            denormalizationContext: ['groups' => ['work:create']],
            security: 'is_granted("WORK_CREATE")',
        ),
        new Get(
            security: 'is_granted("WORK_VIEW")',
            provider: WorkProvider::class
        ),
        new GetCollection(
            security: 'is_granted("WORK_VIEW_LIST")',
            provider: WorkProvider::class
        ),
        new Delete(
            security: 'is_granted("WORK_DELETE")',
        ),
        new Put(
            denormalizationContext: ['groups' => ['work:update']],
            security: 'is_granted("WORK_EDIT")',
        ),
    ],
    normalizationContext: ['groups' => ['work:read', 'id', 'timestamp']],
)]
#[Vich\Uploadable]
class Work extends AbstractEntity
{
    use IdentifiableTrait;
    use TimestampableTrait;

    #[ORM\Column(length: 255, nullable: false)]
    #[Groups(['work:read', 'work:create', 'work:update', 'masterclass:read', 'masterclass:read:item'])]
    private string $name;

    #[ORM\ManyToOne(inversedBy: 'works')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['work:read', 'masterclass_user:read:item', 'work:create', 'work:update', 'masterclass:read'])]
    private ?Category $category = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['work:read', 'work:create', 'work:update'])]
    private ?DateTimeInterface $date = null;

    #[ORM\OneToMany(mappedBy: 'work', targetEntity: Masterclass::class, orphanRemoval: true)]
    private Collection $masterclasses;

    #[ORM\ManyToOne(inversedBy: 'works')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['work:read', 'masterclass_user:read:item', 'work:create', 'work:update'])]
    private ?Composer $composer = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['work:read', 'work:create', 'work:update'])]
    private ?string $description = null;

    #[ORM\OneToOne(mappedBy: 'work', targetEntity: WorkAudio::class, cascade: ['persist', 'remove'])]
    #[Groups(['work:read'])]
    private ?WorkAudio $workAudio = null;

    #[ORM\OneToMany(mappedBy: 'work', targetEntity: WorkScore::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['work:read'])]
    private Collection $workScores;

    #[ORM\OneToMany(mappedBy: 'work', targetEntity: FavoritesWork::class, orphanRemoval: true)]
    private Collection $favoritesWorks;

    #[Groups(['work:read'])]
    private bool $isFavorite = false;

    public function __construct($array = [])
    {
        parent::__construct($array);
        $this->masterclasses = new ArrayCollection();
        $this->workScores = new ArrayCollection();
        $this->favoritesWorks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getWorkAudio(): ?WorkAudio
    {
        return $this->workAudio;
    }

    public function setWorkAudio(WorkAudio $workAudio): static
    {
        // set the owning side of the relation if necessary
        if ($workAudio->getWork() !== $this) {
            $workAudio->setWork($this);
        }

        $this->workAudio = $workAudio;

        return $this;
    }

    /**
     * @return Collection<int, WorkScore>
     */
    public function getWorkScores(): Collection
    {
        return $this->workScores;
    }

    public function addWorkScore(WorkScore $workScore): static
    {
        if (!$this->workScores->contains($workScore)) {
            $this->workScores->add($workScore);
            $workScore->setWork($this);
        }

        return $this;
    }

    public function removeWorkScore(WorkScore $workScore): static
    {
        // set the owning side to null (unless already changed)
        if ($this->workScores->removeElement($workScore) && $workScore->getWork() === $this) {
            $workScore->setWork(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, FavoritesWork>
     */
    public function getFavoritesWorks(): Collection
    {
        return $this->favoritesWorks;
    }

    public function addFavoritesWork(FavoritesWork $favoritesWork): static
    {
        if (!$this->favoritesWorks->contains($favoritesWork)) {
            $this->favoritesWorks->add($favoritesWork);
            $favoritesWork->setWork($this);
        }

        return $this;
    }

    public function removeFavoritesWork(FavoritesWork $favoritesWork): static
    {
        // set the owning side to null (unless already changed)
        if ($this->favoritesWorks->removeElement($favoritesWork) && $favoritesWork->getWork() === $this) {
            $favoritesWork->setWork(null);
        }

        return $this;
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
}
