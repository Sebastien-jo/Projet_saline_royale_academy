<?php

namespace App\Entity\Lesson;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
class LessonArticle extends Lesson
{
    #[ORM\Column(type: Types::TEXT)]
    private ?string $content = null;

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function getType(): string
    {
        return 'article';
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }
}
