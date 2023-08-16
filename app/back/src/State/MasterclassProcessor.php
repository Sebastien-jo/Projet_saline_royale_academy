<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Masterclass;
use App\Entity\User;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\SecurityBundle\Security;

final readonly class MasterclassProcessor implements ProcessorInterface
{
    public function __construct(
        private LoggerInterface $logger,
        private Security $security,
        private readonly ProcessorInterface $persistProcessor,
        private readonly ProcessorInterface $removeProcessor,
    ) {
    }

    /**
     * @param array<string> $context
     * @param array<string> $uriVariables
     *
     * @throws Exception
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): object
    {
        try {
            /** @var Masterclass $masterclass */
            $masterclass = $data;

            /** @var User $user */
            $user = $this->security->getUser();

            if (!$masterclass->getTeacher() instanceof User) {
                $masterclass->setTeacher($user);
            }

            if ($operation instanceof DeleteOperationInterface) {
                return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
            }

            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        } catch (Exception $e) {
            $this->logger->error($e->getMessage());
            throw new Exception($e->getMessage(), $e->getCode(), $e);
        }
    }
}
