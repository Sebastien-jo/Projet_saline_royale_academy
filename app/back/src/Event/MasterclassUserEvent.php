<?php

namespace App\Event;

use App\Entity\Masterclass;
use App\Entity\User;
use Stringable;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\EventDispatcher\Event;

class MasterclassUserEvent extends Event implements Stringable
{
    private const PREFIX = 'masterclassUser:';

    final public const CREATE = self::PREFIX . 'create';
    final public const DELETE = self::PREFIX . 'delete';
    private JsonResponse $response;

    public function __construct(private readonly Masterclass $masterclass, private readonly User $user)
    {
    }

    public function getMasterclass(): Masterclass
    {
        return $this->masterclass;
    }

    public function getUser(): User
    {
        return $this->user;
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
        return sprintf('Masterclass ID: %s ; User ID: %s', $this->masterclass->getId(), $this->user->getId());
    }
}
