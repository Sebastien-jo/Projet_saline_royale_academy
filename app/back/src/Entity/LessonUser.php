<?php

namespace App\Entity;

use App\Entity\Lesson\Lesson;
use App\Entity\Traits\IdentifiableTrait;
use App\Repository\LessonUserRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LessonUserRepository::class)]
class LessonUser extends AbstractEntity
{
    use IdentifiableTrait;
    use SoftDeleteableEntity;

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
