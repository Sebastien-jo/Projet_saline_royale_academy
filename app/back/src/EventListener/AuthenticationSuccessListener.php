<?php

namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();

        /** @var User $user */
        $user = $event->getUser();

        $data['data'] = [
            'id' => $user->getId(),
            'username' => $user->getUserIdentifier(),
            'firstname'=> $user->getFirstName(),
            'lastname' => $user->getLastname(),
            'roles' => $user->getRoles(),
            'instrument' => $user->getInstrument(),
        ];
        $event->setData($data);
    }
}
