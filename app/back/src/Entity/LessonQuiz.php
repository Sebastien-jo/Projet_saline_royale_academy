<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
class LessonQuiz extends Lesson
{
    public function getType(): string
    {
        return 'quiz';
    }
}
