<?php

namespace App\Entity\Lesson;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;

#[Entity]
class LessonVideo extends Lesson
{
    final public const TYPE = 'lesson_video';

    #[Groups(['masterclass_user:read', 'masterclass:write', 'masterclass:read:item'])]
    #[ORM\Column(length: 10000, nullable: true)]
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
