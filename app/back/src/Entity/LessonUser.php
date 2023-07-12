<?php

namespace App\Entity;

use App\Entity\Lesson\Lesson;
use App\Repository\LessonUserRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LessonUserRepository::class)]
class LessonUser
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Lesson $lesson = null;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $validatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'lessonUsers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?SectionUser $sectionUser = null;

    public function getId(): ?int
    {
        return $this->id;
    }

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
}
