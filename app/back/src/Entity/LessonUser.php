<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Patch;
use App\Entity\Lesson\Lesson;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\LessonUserRepository;
use App\State\LessonUserProcessor;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Patch(
            uriTemplate: '/lesson_users/{id}/validate',
            denormalizationContext: ['groups' => ['lesson_user:patch']],
            security: "is_granted('ROLE_STUDENT') or is_granted('ROLE_ADMIN')",
            processor: LessonUserProcessor::class
        ),
    ],
    normalizationContext: ['groups' => ['lesson_user:read', 'timestamp']],
    denormalizationContext: ['groups' => ['lesson_user:write']]
)]
#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: LessonUserRepository::class)]
class LessonUser extends AbstractEntity
{
    use IdentifiableTrait;
    use SoftDeleteableEntity;
    use TimestampableTrait;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Lesson $lesson = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['masterclass_user:read:item'])]
    private ?DateTimeImmutable $validatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'lessonUsers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?SectionUser $sectionUser = null;

    public function getLesson(): ?Lesson
    {
        return $this->lesson;
    }

    public function setLesson(?Lesson $lesson): static
    {
        $this->lesson = $lesson;

        return $this;
    }

    public function getValidatedAt(): ?DateTimeImmutable
    {
        return $this->validatedAt;
    }

    public function setValidatedAt(?DateTimeImmutable $validatedAt): static
    {
        $this->validatedAt = $validatedAt;

        return $this;
    }

    public function getSectionUser(): ?SectionUser
    {
        return $this->sectionUser;
    }

    public function setSectionUser(?SectionUser $sectionUser): static
    {
        $this->sectionUser = $sectionUser;

        return $this;
    }

    #[Groups(['masterclass_user:read:item'])]
    public function getLessonInfo(): mixed
    {
        return [
            'id' => $this->lesson?->getId(),
            'name' => $this->lesson?->getName(),
            'position' => $this->lesson?->getPosition(),
        ];
    }
}
