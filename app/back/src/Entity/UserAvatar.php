<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\Api\UserAvatarController;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\UserAvatarRepository;
use ArrayObject;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: UserAvatarRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Post(
            inputFormats: ['multipart' => ['multipart/form-data']],
            controller: UserAvatarController::class,
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
                                ],
                            ],
                        ],
                    ])
                )
            ),
            security: 'is_granted("USER_AVATAR_CREATE")',
            name: 'create_user_avatar'
        ),
        new Delete(
            security: 'is_granted("USER_AVATAR_DELETE", object)',
        ),
    ],
    normalizationContext: ['groups' => ['avatar:read', 'timestamp']],
)]
#[Vich\Uploadable]
class UserAvatar extends AbstractEntity
{
    use TimestampableTrait;
    use IdentifiableTrait;

    #[Vich\UploadableField(mapping: 'avatarFile', fileNameProperty: 'imagePath')]
    #[Assert\NotNull(groups: ['avatar:create'])]
    public ?File $imageFile = null;

    #[Groups(['avatar:read', 'user:read'])]
    public ?string $contentUrl = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['avatar:read', 'user:read'])]
    public ?string $imagePath = null;

    #[ORM\OneToOne(inversedBy: 'userAvatar', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setImageFile(?File $imageFile): static
    {
        $this->imageFile = $imageFile;

        if ($imageFile instanceof File) {
            $this->setUpdatedAt(new DateTime('now'));
        }

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function getContentUrl(): ?string
    {
        return 'files/avatar/' . $this->getImagePath();
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
