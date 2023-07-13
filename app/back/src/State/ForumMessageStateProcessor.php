<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\ForumMessage;
use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;

class ForumMessageStateProcessor implements ProcessorInterface
{
    public function __construct(
        private readonly ProcessorInterface $persistProcessor,
        private readonly ProcessorInterface $removeProcessor,
        private readonly Security $security
    ) {
    }

    /**
     * @param ForumMessage $data
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        /** @var User $user */
        $user = $this->security->getUser();

        /** @var ForumMessage $data */
        if ($data->getParent() != null) {
            $data->setForum($data->getParent()->getForum());
        }
        if ($data->getUser() == null) {
            $data->setUser($user);
        }

        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
