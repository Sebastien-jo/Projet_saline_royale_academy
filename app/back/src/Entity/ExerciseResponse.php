<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Lesson\LessonExercise;
use App\Repository\ExerciseResponseRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExerciseResponseRepository::class)]
#[ApiResource]
class ExerciseResponse extends AbstractEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'quizResponses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'exerciseResponses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?LessonExercise $lessonExercise = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getLesson(): ?LessonExercise
    {
        return $this->lessonExercise;
    }

    public function setLesson(?LessonExercise $lessonExercise): static
    {
        $this->lessonExercise = $lessonExercise;

        return $this;
    }
}
