<?php

namespace App\Entity\Lesson;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity()]
class LessonArticle extends Lesson
{
    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['masterclass:write'])]
    private ?string $content = null;

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function getType(): string
    {
        return 'lesson_article';
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }
}
