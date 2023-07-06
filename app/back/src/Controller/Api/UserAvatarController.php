<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\UserAvatar;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

#[AsController]
class UserAvatarController extends AbstractController
{
    public function __invoke(Request $request, Security $security): UserAvatar
    {
        /** @var User $user */
        $user = $security->getUser();
        /** @var ?File $uploadedFile */
        $uploadedFile = $request->files->get('imageFile');

        if (!$uploadedFile instanceof \Symfony\Component\HttpFoundation\File\File) {
            throw new BadRequestHttpException('"file" is required');
        }

        if ($user->getUserAvatar() instanceof \App\Entity\UserAvatar) {
            throw new ConflictHttpException('This user already has an avatar, please delete old one before');
        }

        $userAvatar = new UserAvatar();
        $userAvatar->imageFile = $uploadedFile;
        $userAvatar->setUser($user);

        return $userAvatar;
    }
}
