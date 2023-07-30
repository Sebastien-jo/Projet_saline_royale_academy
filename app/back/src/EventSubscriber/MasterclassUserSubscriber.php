<?php

namespace App\EventSubscriber;

use App\Entity\MasterclassUser;
use App\Event\MasterclassUserEvent;
use App\Manager\MasterclassUserManager;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class MasterclassUserSubscriber implements EventSubscriberInterface
{
    public function __construct(private readonly MasterclassUserManager $masterclassUserManager)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::RESPONSE => [
                ['onKernelResponsePre', 10],
                ['onKernelResponsePost', -10],
            ],
            MasterclassUserEvent::CREATE => 'onCreateMasterclassUser',
            MasterclassUserEvent::DELETE => 'onDeleteMasterclassUser',
        ];
    }

    public function onKernelResponsePre(ResponseEvent $event): void
    {
        // ...
    }

    public function onKernelResponsePost(ResponseEvent $event): void
    {
        // ...
    }

    public function onCreateMasterclassUser(MasterclassUserEvent $event): MasterclassUser
    {
        $masterclass = $event->getMasterclass();
        $user = $event->getUser();

        return $this->masterclassUserManager->create($masterclass, $user);
    }

    public function onDeleteMasterclassUser(MasterclassUserEvent $event): void
    {
    }
}
