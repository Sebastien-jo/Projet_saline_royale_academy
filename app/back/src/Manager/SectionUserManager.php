<?php

namespace App\Manager;

use App\Entity\Section;
use App\Entity\SectionUser;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;

class SectionUserManager
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly LessonUserManager $lessonUserManager
    ) {
    }

    public function create(Section $section, User $user, bool $flush = true): SectionUser
    {
        $sectionUser = new SectionUser(['section' => $section, 'user' => $user]);
        foreach ($section->getLessons() as $lesson) {
            $lessonUser = $this->lessonUserManager->create($lesson, $user, false);
            $sectionUser->addLessonUser($lessonUser);
        }

        if ($flush) {
            $this->entityManager->persist($sectionUser);
            $this->entityManager->flush();
        }

        return $sectionUser;
    }

    public function isValidated(SectionUser $sectionUser): bool
    {
        foreach ($sectionUser->getLessonUsers() as $lessonUser) {
            if (!$lessonUser->getValidatedAt() instanceof DateTimeImmutable) {
                return false;
            }
        }

        return true;
    }

    public function validate(SectionUser $sectionUser, DateTimeImmutable $dateTime = null): void
    {
        $sectionUser->setValidatedAt($dateTime ?? new DateTimeImmutable());
        $this->entityManager->flush();
    }
}
