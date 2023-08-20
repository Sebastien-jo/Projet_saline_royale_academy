<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Forum;
use App\Entity\LessonUser;
use App\Event\LessonUserEvent;
use Exception;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

readonly class LessonUserProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $persistProcessor,
        private ProcessorInterface $removeProcessor,
        private EventDispatcherInterface $dispatcher,
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
        /** @var LessonUser $object */
        $object = $data;

        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($object, $operation, $uriVariables, $context);
        } elseif ($operation instanceof Patch) {
            $event = new LessonUserEvent($object);

            return $this->dispatcher->dispatch($event, LessonUserEvent::VALIDATE)->getResponse();
        }

        return $this->persistProcessor->process($object, $operation, $uriVariables, $context);
    }
}
