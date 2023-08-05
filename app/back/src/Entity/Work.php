<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\WorkRepository;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: WorkRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['work:read']], denormalizationContext: ['groups' => ['work:create']])]
#[Vich\Uploadable]
class Work extends AbstractEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['work:read', 'masterclass_user:read:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'works')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['work:read', 'masterclass_user:read:item'])]
    private ?Category $category = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['work:read'])]
    private ?DateTimeInterface $date = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagePath = null;

    #[ORM\OneToMany(mappedBy: 'work', targetEntity: Masterclass::class)]
    private Collection $masterclasses;

    #[ORM\ManyToOne(inversedBy: 'works')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['work:read', 'masterclass_user:read:item'])]
    private ?Composer $composer = null;

    #[Vich\UploadableField(mapping: 'avatar_object', fileNameProperty: 'avatarPath')]
    #[Groups(['user:create'])]
    public ?File $partition = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $partitionPath = null;

    #[Vich\UploadableField(mapping: 'avatar_object', fileNameProperty: 'avatarPath', size: 'audioSize', mimeType: 'audio/mpeg, audio/x-wav, audio/ogg, audio/mp3, audio/wav, audio/mpeg3, audio/x-mpeg-3, audio/x-mpeg, audio/x-mpegaudio')]
    #[Groups(['user:create'])]
    public ?File $audio = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $audioPath = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    public function getPartition(): ?File
    {
        return $this->partition;
    }

    public function setPartition(?File $partition): void
    {
        $this->partition = $partition;
    }

    public function getAudio(): ?File
    {
        return $this->audio;
    }

    public function setAudio(?File $audio): void
    {
        $this->audio = $audio;
    }

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

    public function getPartitionPath(): ?string
    {
        return $this->partitionPath;
    }

    public function setPartitionPath(?string $PartitionPath): static
    {
        $this->partitionPath = $PartitionPath;

        return $this;
    }

    public function getAudioPath(): ?string
    {
        return $this->audioPath;
    }

    public function setAudioPath(?string $audioPath): static
    {
        $this->audioPath = $audioPath;

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
