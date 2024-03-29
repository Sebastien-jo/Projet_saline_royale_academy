<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Favorites\Favorites;
use App\Entity\Forum;
use App\Entity\User;
use Exception;
use Symfony\Bundle\SecurityBundle\Security;

readonly class SetUserProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $persistProcessor,
        private ProcessorInterface $removeProcessor,
        private Security $security,
    ) {
    }

    /**
     * @param Forum        $data
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @throws Exception
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        /** @var Forum|Favorites $object */
        $object = $data;

        /** @var User $user */
        $user = $this->security->getUser();
        if ($object->getUser() == null) {
            $object->setUser($user);
        }

        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($object, $operation, $uriVariables, $context);
        }

        return $this->persistProcessor->process($object, $operation, $uriVariables, $context);
    }
}
