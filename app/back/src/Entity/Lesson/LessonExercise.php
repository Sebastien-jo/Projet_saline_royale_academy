<?php

namespace App\Entity\Lesson;

use App\Entity\ExerciseResponse;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
class LessonExercise extends Lesson
{
    final public const TYPE = 'lesson_exercise';

    #[ORM\OneToMany(mappedBy: 'lesson', targetEntity: ExerciseResponse::class)]
    private Collection $exerciseResponses;

    #[Groups(['masterclass_user:read', 'masterclass:write', 'masterclass:read:item'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $content = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['masterclass_user:read', 'masterclass:write', 'masterclass:read:item'])]
    private ?string $url = null;

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

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(?string $url): static
    {
        $this->url = $url;

        return $this;
    }
}
