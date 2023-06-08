<?php

namespace App\Entity;

use Doctrine\ORM\Mapping\Entity;

#[Entity]
class LessonVideo extends Lesson
{
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
        return 'video';
    }
}
