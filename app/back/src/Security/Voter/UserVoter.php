<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class UserVoter extends Voter
{
    private const PREFIX = 'USER_PROFILE';

    final public const EDIT = self::PREFIX . '_EDIT';
    final public const VIEW = self::PREFIX . '_VIEW';
    final public const DELETE = self::PREFIX . '_DELETE';
    final public const VIEW_LIST = self::VIEW . '_LIST';
    final public const VIEW_STATS = self::VIEW . '_STATS';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::EDIT, self::VIEW, self::VIEW_LIST, self::VIEW_STATS, self::DELETE]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var User $user */
        $user = $token->getUser();

        /**
         * @var User $object
         */
        $object = $subject;

        return match ($attribute) {
            self::EDIT => $this->canEdit($user, $object),
            self::DELETE => $this->canDelete($user, $object),
            self::VIEW => $this->canView($user, $object),
            self::VIEW_LIST => $this->canViewList($user),
            self::VIEW_STATS => $this->canViewStat($user, $object),
            default => false,
        };
    }

    private function canView(User $user, User $object): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles()) || ($user === $object);
    }

    private function canViewList(User $user): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles());
    }

    private function canEdit(User $user, User $object): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles()) || ($user === $object);
    }

    private function canViewStat(User $user, User $object): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles()) || ($user === $object);
    }

    private function canDelete(User $user, User $object): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles()) || ($user === $object);
    }
}
