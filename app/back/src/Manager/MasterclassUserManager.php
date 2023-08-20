<?php

namespace App\Manager;

use ApiPlatform\Validator\ValidatorInterface;
use App\Entity\Masterclass;
use App\Entity\MasterclassUser;
use App\Entity\User;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Exception;

readonly class MasterclassUserManager
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private SectionUserManager $sectionUserManager,
        private ValidatorInterface $validator
    ) {
    }

    /**
     * @throws Exception
     */
    public function create(Masterclass $masterclass, User $user, bool $flush = true): MasterclassUser
    {
        $masterclassUser = $this->entityManager->getRepository(MasterclassUser::class)->findOneBy([
            'masterclass' => $masterclass, 'user' => $user,
        ]);

        if ($masterclassUser instanceof MasterclassUser) {
            if ($masterclassUser->getDeletedAt() instanceof DateTime) {
                $masterclassUser->setDeletedAt(null);
            }
        } else {
            $masterclassUser = new MasterclassUser(['masterclass' => $masterclass, 'user' => $user]);

            foreach ($masterclass->getSections() as $section) {
                $sectionUser = $this->sectionUserManager->create($section, $user, false);
                $masterclassUser->addSectionUser($sectionUser);
            }
        }

        if ($flush) {
            $this->entityManager->persist($masterclassUser);
            $this->validator->validate($masterclassUser);
            $this->entityManager->flush();
        }

        return $masterclassUser;
    }

    public function delete(Masterclass $masterclass, User $user): void
    {
        $masterclassUser = $this->entityManager->getRepository(MasterclassUser::class)->findOneBy([
            'masterclass' => $masterclass, 'user' => $user,
        ]);

        if ($masterclassUser instanceof \App\Entity\MasterclassUser) {
            $this->entityManager->remove($masterclassUser);
            $this->entityManager->flush();
        }
    }

    public function isValidated(MasterclassUser $masterclassUser): bool
    {
        foreach ($masterclassUser->getSectionUsers() as $sectionUser) {
            if (!$sectionUser->getValidatedAt() instanceof DateTimeImmutable) {
                return false;
            }
        }

        return true;
    }

    public function validate(MasterclassUser $masterclassUser, DateTimeImmutable $dateTime = null): void
    {
        $masterclassUser->setValidatedAt($dateTime ?? new DateTimeImmutable());
        $this->entityManager->flush();
    }
}
