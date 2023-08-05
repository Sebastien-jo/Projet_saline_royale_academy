<?php

namespace App\Security\Voter;

use App\Entity\Forum;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class ForumVoter extends Voter
{
    private const PREFIX = 'FORUM';
    private const ADMIN = 'ADMIN';

    final public const EDIT = self::PREFIX . '_EDIT';
    final public const VIEW = self::PREFIX . '_VIEW';
    final public const CREATE = self::PREFIX . '_CREATE';
    final public const DELETE = self::PREFIX . '_DELETE';

    final public const VIEW_LIST = self::VIEW . '_LIST';
    final public const ADMIN_CREATE = self::ADMIN . ':' . self::CREATE;

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::EDIT, self::VIEW, self::CREATE, self::ADMIN_CREATE, self::VIEW_LIST, self::DELETE]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var User $user */
        $user = $token->getUser();

        return match ($attribute) {
            self::EDIT => $this->canEdit($user, $subject),
            self::VIEW => $this->canView(),
            self::CREATE, self::ADMIN_CREATE => $this->canCreate(),
            self::VIEW_LIST => $this->canViewList(),
            self::DELETE=> $this->canDelete($user),
            default => false,
        };
    }

    private function canCreate(): bool
    {
        return true;
    }

    private function canView(): bool
    {
        return true;
    }

    private function canViewList(): bool
    {
        return true;
    }

    /**
     * @param array<mixed> $subject
     */
    private function canEdit(User $user, array $subject): bool
    {
        /**
         * @var Forum $object
         * @var Forum $previousObject
         */
        [$object, $previousObject] = $subject;

        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }

        return $object->getUser() === $user && $user === $previousObject->getUser();
    }

    private function canDelete(User $user): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles());
    }
}
