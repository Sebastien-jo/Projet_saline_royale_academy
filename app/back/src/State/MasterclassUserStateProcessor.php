<?php

// api/src/State/UserPasswordHasher.php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Masterclass;
use App\Entity\MasterclassUser;
use App\Entity\User;
use App\Event\MasterclassUserEvent;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

final readonly class MasterclassUserStateProcessor implements ProcessorInterface
{
    public function __construct(
        private LoggerInterface $logger,
        private Security $security,
        private EntityManagerInterface $entityManager,
        private EventDispatcherInterface $dispatcher,
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
        $e = null;
        try {
            if (!($masterclass = $this->entityManager->getRepository(Masterclass::class)->find($uriVariables['masterclassId'])) instanceof \App\Entity\Masterclass) {
                throw new Exception('Masterclass not found');
            }
            /** @var MasterclassUser $masterclassUser */
            $masterclassUser = $data;
            /** @var User $user */
            $user = $this->security->getUser();
            $user = $masterclassUser->getUser() ?? $user;

            $masterclassUser->setMasterclass($masterclass);
            $event = new MasterclassUserEvent($masterclass, $user);

            if ($operation instanceof DeleteOperationInterface) {
                return $this->dispatcher->dispatch($event, MasterclassUserEvent::DELETE);
            }

            return $this->dispatcher->dispatch($event, MasterclassUserEvent::CREATE);
        } catch (Exception $e) {
            $this->logger->error($e->getMessage());
            throw new Exception($e->getMessage(), $e->getCode(), $e);
        }
    }
}
