<?php

namespace App\Security\Voter;

use App\Entity\LessonUser;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class LessonUserVoter extends Voter
{
    private const PREFIX = 'LESSON_USER';

    final public const VALIDATE = self::PREFIX . '_VALIDATE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return $attribute == self::VALIDATE;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var LessonUser $subject */
        /** @var User $user */
        $user = $token->getUser();

        return match ($attribute) {
            self::VALIDATE => $this->canValidate($user, $subject),
            default => false,
        };
    }

    private function canValidate(User $user, LessonUser $subject): bool
    {
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }

        return $subject->getSectionUser()?->getMasterclassUser()?->getUser() === $user;
    }
}
