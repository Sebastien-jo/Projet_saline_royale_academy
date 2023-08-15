<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\Api\BadgeImageController;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\BadgeImageRepository;
use ArrayObject;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: BadgeImageRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            controller: BadgeImageController::class,
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
                                    'badge' => [
                                        'type' => 'string',
                                        'format' => 'iri',
                                        'example' => 'api/badges/2',
                                    ],
                                ],
                            ],
                        ],
                    ])
                )
            ),
            denormalizationContext: ['groups' => ['badge:image:create']],
            security: 'is_granted("BADGE_IMAGE_CREATE")',
        ),
        new Delete(
            security: 'is_granted("BADGE_IMAGE_DELETE")',
        ),
    ],
    normalizationContext: ['groups' => ['badge:image:read', 'timestamp']],
    denormalizationContext: ['groups' => ['badge:image:create']],
    filters: ['translation.groups'],
)]
#[Vich\Uploadable]
class BadgeImage extends AbstractEntity
{
    use TimestampableTrait;
    use IdentifiableTrait;

    #[Vich\UploadableField(mapping: 'badgeFile', fileNameProperty: 'imagePath')]
    #[Assert\NotNull(groups: ['badge:image:create'])]
    public ?File $imageFile = null;

    #[Groups(['badge:image:read', 'badge:read'])]
    public ?string $contentUrl = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['badge:image:read', 'badge:read'])]
    public ?string $imagePath = null;

    #[ORM\OneToOne(inversedBy: 'badgeImage', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Assert\NotNull(groups: ['badge:image:create'])]
    private ?Badge $Badge = null;

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
        return 'files/badge_images/' . $this->getImagePath();
    }

    public function setContentUrl(string $contentUrl): static
    {
        $this->contentUrl = $contentUrl;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function getBadge(): ?Badge
    {
        return $this->Badge;
    }

    public function setBadge(Badge $Badge): static
    {
        $this->Badge = $Badge;

        return $this;
    }
}
