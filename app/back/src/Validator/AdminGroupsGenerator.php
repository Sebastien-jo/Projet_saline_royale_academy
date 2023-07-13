<?php

namespace App\Validator;

use ApiPlatform\Symfony\Validator\ValidationGroupsGeneratorInterface;
use App\Entity\ForumMessage;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Validator\Constraints\GroupSequence;

final readonly class AdminGroupsGenerator implements ValidationGroupsGeneratorInterface
{
    public function __construct(private AuthorizationCheckerInterface $authorizationChecker)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function __invoke(object $object): array|GroupSequence
    {
        assert($object instanceof ForumMessage);

        return $this->authorizationChecker->isGranted('ROLE_ADMIN', $object) ? ['admin:write', 'user:write'] : ['user:write'];
    }
}
