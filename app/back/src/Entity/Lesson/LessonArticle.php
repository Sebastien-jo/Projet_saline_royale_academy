<?php

namespace App\Entity\Lesson;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity()]
class LessonArticle extends Lesson
{
    final public const TYPE = 'lesson_article';

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['masterclass_user:read', 'masterclass:write', 'masterclass:read:item'])]
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
