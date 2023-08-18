<?php

namespace App\EventSubscriber;

use App\Entity\SectionUser;
use App\Event\LessonUserEvent;
use App\Manager\LessonUserManager;
use App\Manager\MasterclassUserManager;
use App\Manager\SectionUserManager;
use DateTimeImmutable;
use Exception;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class LessonUserSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly LessonUserManager $lessonUserManager,
        private readonly SectionUserManager $sectionUserManager,
        private readonly MasterclassUserManager $masterclassUserManager,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            LessonUserEvent::VALIDATE => 'onValidateLessonUser',
        ];
    }

    /**
     * @throws Exception
     */
    public function onValidateLessonUser(LessonUserEvent $event): void
    {
        try {
            $lessonUser = $event->getLessonUser();
            $sectionUser = $lessonUser->getSectionUser();
            $masterclassUser = $sectionUser?->getMasterclassUser();
            $now = new DateTimeImmutable();

            $this->lessonUserManager->validate($lessonUser, $now);

            if (($sectionUser instanceof SectionUser) && $this->sectionUserManager->isValidated($sectionUser)) {
                $this->sectionUserManager->validate($sectionUser, $now);
            }

            if (isset($masterclassUser) && $this->masterclassUserManager->isValidated($masterclassUser)) {
                $this->masterclassUserManager->validate($masterclassUser, $now);
            }

            $event->setResponse(new JsonResponse([
                'response' => 'Success',
                'message' => 'Lesson validated',
            ]));
        } catch (Exception $e) {
            $event->setResponse(new JsonResponse([
                'response' => 'Error',
                'message' => $e->getMessage(),
            ]));
        }
    }
}
