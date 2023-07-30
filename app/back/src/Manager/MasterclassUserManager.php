<?php

namespace App\Manager;

use App\Entity\Masterclass;
use App\Entity\MasterclassUser;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class MasterclassUserManager
{
    public function __construct(private readonly EntityManagerInterface $entityManager, private readonly SectionUserManager $sectionUserManager)
    {
    }

    public function create(Masterclass $masterclass, User $user, bool $flush = true): MasterclassUser
    {
        $masterclassUser = new MasterclassUser(['masterclass' => $masterclass, 'user' => $user]);

        foreach ($masterclass->getSections() as $section) {
            $sectionUser = $this->sectionUserManager->create($section, $user, false);
            $masterclassUser->addSectionUser($sectionUser);
        }

        if ($flush) {
            $this->entityManager->persist($masterclassUser);
            $this->entityManager->flush();
        }

        return $masterclassUser;
    }

    public function delete(MasterclassUser $masterclassUser): void
    {
        $this->entityManager->remove($masterclassUser);
        $this->entityManager->flush();
    }
}
