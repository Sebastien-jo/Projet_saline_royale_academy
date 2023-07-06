<?php

namespace App\Security\Voter;

use App\Entity\User;
use App\Entity\UserAvatar;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class UserAvatarVoter extends Voter
{
    private const PREFIX = 'USER_AVATAR';
    private const ADMIN = 'ADMIN';

    final public const DELETE = self::PREFIX . '_DELETE';
    final public const CREATE = self::PREFIX . '_CREATE';

    final public const ADMIN_CREATE = self::ADMIN . ':' . self::CREATE;

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::DELETE, self::CREATE, self::ADMIN_CREATE]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var User $user */
        $user = $token->getUser();

        /**
         * @var UserAvatar $object
         */
        $object = $subject;

        return match ($attribute) {
            self::DELETE => $this->canDelete($user, $object),
            self::CREATE => $this->canCreate(),
            default => false,
        };
    }

    private function canCreate(): bool
    {
        return true;
    }

    private function canDelete(User $user, UserAvatar $object): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles()) || $user->getId() === $object->getUser()?->getId();
    }
}
