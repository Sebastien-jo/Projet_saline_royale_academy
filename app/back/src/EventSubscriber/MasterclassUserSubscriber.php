<?php

namespace App\EventSubscriber;

use ApiPlatform\Api\UrlGeneratorInterface;
use App\Event\MasterclassUserEvent;
use App\Manager\MasterclassUserManager;
use Exception;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class MasterclassUserSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly MasterclassUserManager $masterclassUserManager,
        private readonly UrlGeneratorInterface $urlGenerator,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            MasterclassUserEvent::CREATE => 'onCreateMasterclassUser',
            MasterclassUserEvent::DELETE => 'onDeleteMasterclassUser',
        ];
    }

    /**
     * @throws Exception
     */
    public function onCreateMasterclassUser(MasterclassUserEvent $event): void
    {
        try {
            $masterclass = $event->getMasterclass();
            $user = $event->getUser();

            $masterclassUser = $this->masterclassUserManager->create($masterclass, $user);

            $event->setResponse(new JsonResponse([
                'response' => 'success',
                'uri'   => $this->urlGenerator->generate('get_masterclass_user', ['id' => $masterclassUser->getId()]),
            ]));
        } catch (Exception $e) {
            $event->setResponse(new JsonResponse([
                'response' => 'error',
                'message' => $e->getMessage(),
            ]));
        }
    }

    public function onDeleteMasterclassUser(MasterclassUserEvent $event): void
    {
        try {
            $masterclass = $event->getMasterclass();
            $user = $event->getUser();

            $this->masterclassUserManager->delete($masterclass, $user);
        } catch (Exception $e) {
            $event->setResponse(new JsonResponse([
                'response' => 'error',
                'message' => $e->getMessage(),
            ]));
        }
    }
}
