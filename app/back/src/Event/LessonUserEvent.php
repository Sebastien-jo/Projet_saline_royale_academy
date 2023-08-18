<?php

namespace App\Event;

use App\Entity\LessonUser;
use Stringable;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\EventDispatcher\Event;

class LessonUserEvent extends Event implements Stringable
{
    private const PREFIX = 'lessonUser:';

    final public const VALIDATE = self::PREFIX . 'validate';

    private JsonResponse $response;

    public function __construct(private readonly LessonUser $lessonUser)
    {
    }

    public function getLessonUser(): LessonUser
    {
        return $this->lessonUser;
    }

    public function setResponse(JsonResponse $response): void
    {
        $this->response = $response;
    }

    public function getResponse(): JsonResponse
    {
        return $this->response;
    }

    public function __toString(): string
    {
        return self::PREFIX . $this->lessonUser->getId();
    }
}
