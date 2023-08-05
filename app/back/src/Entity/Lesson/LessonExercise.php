<?php

namespace App\Entity\Lesson;

use App\Entity\ExerciseResponse;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class LessonExercise extends Lesson
{
    private const TYPE = 'exercise';

    #[ORM\OneToMany(mappedBy: 'lesson', targetEntity: ExerciseResponse::class)]
    private Collection $exerciseResponses;

    public function __construct()
    {
        parent::__construct();
        $this->exerciseResponses = new ArrayCollection();
    }

    public function getType(): string
    {
        return self::TYPE;
    }

    /**
     * @return Collection<int, ExerciseResponse>
     */
    public function getExerciseResponses(): Collection
    {
        return $this->exerciseResponses;
    }

    public function addExerciseResponse(ExerciseResponse $exerciseResponse): static
    {
        if (!$this->exerciseResponses->contains($exerciseResponse)) {
            $this->exerciseResponses->add($exerciseResponse);
            $exerciseResponse->setLesson($this);
        }

        return $this;
    }

    public function removeExerciseResponse(ExerciseResponse $exerciseResponse): static
    {
        // set the owning side to null (unless already changed)
        if ($this->exerciseResponses->removeElement($exerciseResponse) && $exerciseResponse->getLesson() === $this) {
            $exerciseResponse->setLesson(null);
        }

        return $this;
    }
}
