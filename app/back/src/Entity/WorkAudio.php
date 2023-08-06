<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use App\Controller\Api\WorkAudioController;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\WorkAudioRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: WorkAudioRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            controller: WorkAudioController::class,
            security: 'is_granted("WORK_CREATE")',
        ),
        new Delete(
            security: 'is_granted("WORK_DELETE")',
        ),
    ],
    normalizationContext: ['groups' => ['work:read', 'timestamp', 'id']],
    denormalizationContext: ['groups' => ['work:create']],
)]
#[Vich\Uploadable]
class WorkAudio extends AbstractEntity
{
    use TimestampableTrait;
    use IdentifiableTrait;
    #[Vich\UploadableField(mapping: 'workAudioFile', fileNameProperty: 'audioPath', size: 'size')]
    #[Assert\NotNull(groups: ['work:create', 'work:update'])]
    public ?File $audioFile = null;

    #[Groups(['work:read'])]
    public ?string $contentUrl = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['work:read'])]
    private ?int $size = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['work:read'])]
    private ?string $audioPath = null;

    #[ORM\OneToOne(inversedBy: 'workAudio', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Work $work = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContentUrl(): ?string
    {
        return 'files/work_audio/' . $this->getAudioPath();
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

    public function getWork(): ?Work
    {
        return $this->work;
    }

    public function setWork(Work $work): static
    {
        $this->work = $work;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(?int $size): void
    {
        $this->size = $size;
    }
}
