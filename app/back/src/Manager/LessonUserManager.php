<?php

namespace App\Manager;

use App\Entity\Lesson\Lesson;
use App\Entity\LessonUser;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;

readonly class LessonUserManager
{
    public function __construct(
        private EntityManagerInterface $entityManager,
    ) {
    }

    public function create(Lesson $lesson, User $user, bool $flush = true): LessonUser
    {
        $lessonUser = new LessonUser(['lesson' => $lesson, 'user' => $user]);

        if ($flush) {
            $this->entityManager->persist($lessonUser);
            $this->entityManager->flush();
        }

        return $lessonUser;
    }

    public function validate(LessonUser $lessonUser, DateTimeImmutable $date = null): void
    {
        $lessonUser->setValidatedAt($date ?? new DateTimeImmutable());
        $this->entityManager->flush();
    }
}
