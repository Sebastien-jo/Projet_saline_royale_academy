<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\Api\ComposerImageController;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\ComposerImageRepository;
use ArrayObject;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: ComposerImageRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            controller: ComposerImageController::class,
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
                                    'composer' => [
                                        'type' => 'integer',
                                        'example' => '2',
                                    ],
                                ],
                            ],
                        ],
                    ])
                )
            ),
            denormalizationContext: ['groups' => ['composer:image:create']],
            security: 'is_granted("COMPOSER_CREATE")',
        ),
        new Delete(
            security: 'is_granted("COMPOSER_DELETE")',
        ),
    ],
    normalizationContext: ['groups' => ['composer:image:read', 'timestamp']],
    denormalizationContext: ['groups' => ['badge:image:create']],
)]
#[Vich\Uploadable]
class ComposerImage
{
    use TimestampableTrait;
    use IdentifiableTrait;

    #[Vich\UploadableField(mapping: 'composerFile', fileNameProperty: 'imagePath')]
    #[Assert\NotNull(groups: ['composer:image:create'])]
    public ?File $imageFile = null;

    #[Groups(['composer:image:read', 'composer:read'])]
    public ?string $contentUrl = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['composer:image:read', 'composer:read'])]
    public ?string $imagePath = null;

    #[ORM\OneToOne(inversedBy: 'composerImage', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull(groups: ['composer:image:create'])]
    private ?Composer $composer = null;

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
        return 'files/composer/' . $this->getImagePath();
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

    public function getComposer(): ?Composer
    {
        return $this->composer;
    }

    public function setComposer(Composer $composer): static
    {
        $this->composer = $composer;

        return $this;
    }
}
