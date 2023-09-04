<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\Api\MasterclassImageController;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\MasterclassImageRepository;
use ArrayObject;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: MasterclassImageRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            controller: MasterclassImageController::class,
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                    'masterclass' => [
                                        'type' => 'integer',
                                        'example' => '2',
                                    ],
                                ],
                            ],
                        ],
                    ])
                )
            ),
            denormalizationContext: ['groups' => ['masterclass:image:create']],
            security: "is_granted('ROLE_TEACHER') or is_granted('ROLE_ADMIN')",
        ),
        new Delete(
            security: "is_granted('ROLE_TEACHER') or is_granted('ROLE_ADMIN')",
        ),
    ],
    normalizationContext: ['groups' => ['masterclass:image:read', 'timestamp']],
    denormalizationContext: ['groups' => ['masterclass:image:create']],
)]
#[Vich\Uploadable]
class MasterclassImage
{
    use TimestampableTrait;
    use IdentifiableTrait;

    #[Vich\UploadableField(mapping: 'masterclassFile', fileNameProperty: 'imagePath')]
    #[Assert\NotNull(groups: ['masterclass:image:create'])]
    public ?File $imageFile = null;

    #[Groups(['masterclass:image:read', 'masterclass:read', 'masterclass:read:item'])]
    public ?string $contentUrl = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['masterclass:image:read', 'masterclass:read', 'masterclass:read:item'])]
    public ?string $imagePath = null;

    #[ORM\OneToOne(inversedBy: 'masterclassImage', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull(groups: ['masterclass:image:create'])]
    private ?Masterclass $masterclass = null;

    public function setImageFile(?File $imageFile): static
    {
        $this->imageFile = $imageFile;

        if ($imageFile instanceof File) {
            $this->setUpdatedAt(new DateTime('now'));
        }

        return $this;
    }

    public function getContentUrl(): ?string
    {
        return 'files/masterclass/' . $this->getImagePath();
    }

    public function setContentUrl(?string $contentUrl): static
    {
        $this->contentUrl = $contentUrl;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): static
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function getMasterclass(): ?Masterclass
    {
        return $this->masterclass;
    }

    public function setMasterclass(Masterclass $masterclass): static
    {
        $this->masterclass = $masterclass;

        return $this;
    }
}
