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

    final public const VIEW_LIST = self::VIEW . '_LIST';
    final public const ADMIN_CREATE = self::ADMIN . ':' . self::CREATE;

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::EDIT, self::VIEW, self::CREATE, self::ADMIN_CREATE, self::VIEW_LIST]);
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        /** @var User $user */
        $user = $token->getUser();

        /**
         * @var Forum $object
         * @var Forum $previousObject
         */
        [$object, $previousObject] = $subject;

        return match ($attribute) {
            self::EDIT => $this->canEdit($user, $object, $previousObject),
            self::VIEW => $this->canView(),
            self::CREATE, self::ADMIN_CREATE => $this->canCreate(),
            self::VIEW_LIST => $this->canViewList(),
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

    private function canEdit(User $user, Forum $object, Forum $previousObject): bool
    {
        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return true;
        }

        return $object->getUser() === $user && $user === $previousObject->getUser();
    }
}
