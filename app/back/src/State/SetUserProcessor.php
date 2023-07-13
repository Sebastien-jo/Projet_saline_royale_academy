<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Forum;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;

class SetUserProcessor implements ProcessorInterface
{
    public function __construct(
        private readonly ProcessorInterface $persistProcessor,
        private readonly ProcessorInterface $removeProcessor,
        private readonly Security $security
    ) {
    }

    /**
     * @param Forum        $data
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @return mixed
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        /** @var Forum $forum */
        $forum = $data;

        /** @var User $user */
        $user = $this->security->getUser();
        $forum->setUser($user);

        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($forum, $operation, $uriVariables, $context);
        }

        return $this->persistProcessor->process($forum, $operation, $uriVariables, $context);
    }
}
