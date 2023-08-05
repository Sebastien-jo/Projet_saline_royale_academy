<?php

namespace App\Entity\Lesson;

use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;

#[Entity]
class LessonVideo extends Lesson
{
    #[Groups(['masterclass:write'])]
    private ?string $videoUrl = null;

    public function getVideoUrl(): ?string
    {
        return $this->videoUrl;
    }

    public function setVideoUrl(string $videoUrl): self
    {
        $this->videoUrl = $videoUrl;

        return $this;
    }

    public function getType(): string
    {
        return 'lesson_video';
    }
}
