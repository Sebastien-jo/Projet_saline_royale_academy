<?php

namespace App\Security\Voter;

use App\Entity\MasterclassUser;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class MasterclassUserVoter extends Voter
{
    private const PREFIX = 'MASTERCLASS_USER';

    final public const EDIT = self::PREFIX . '_EDIT';
    final public const ADD = self::PREFIX . '_ADD';
    final public const VIEW = self::PREFIX . '_VIEW';
    final public const CREATE = self::PREFIX . '_CREATE';
    final public const DELETE = self::PREFIX . '_DELETE';

    final public const VIEW_LIST = self::VIEW . '_LIST';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::EDIT, self::VIEW, self::CREATE, self::VIEW_LIST, self::ADD, self::DELETE]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var User $user */
        $user = $token->getUser();

        return match ($attribute) {
            self::EDIT => $this->canEdit($user, $subject),
            self::VIEW => $this->canView($user, $subject),
            self::CREATE => $this->canCreate($user),
            self::VIEW_LIST => $this->canViewList(),
            self::ADD => $this->canAdd($user),
            self::DELETE => $this->canDelete($user, $subject),
            default => false,
        };
    }

    private function canCreate(User $user): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles());
    }

    private function canView(User $user, MasterclassUser $object): bool
    {
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }

        return $object->getUser() === $user || $object->getMasterclass()?->getTeacher() === $user;
    }

    private function canViewList(): bool
    {
        return true;
    }

    private function canEdit(User $user, mixed $subject): bool
    {
        /**
         * @var MasterclassUser $object
         * @var MasterclassUser $previousObject
         */
        [$object, $previousObject] = $subject;

        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return $object->getUser() === $previousObject->getUser();
        }

        return $object->getUser() === $user && $user === $previousObject->getUser();
    }

    private function canAdd(User $user): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles());
    }

    private function canDelete(User $user, MasterclassUser $object): bool
    {
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }

        return $object->getUser() === $user;
    }
}
