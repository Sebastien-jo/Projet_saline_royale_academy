<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Entity\UserAvatar;
use App\Repository\UserRepository;
use App\Services\FileUploader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

#[AsController]
class UserAvatarController extends AbstractController
{
    public function __invoke(Request $request, Security $security, FileUploader $fileUploader, UserRepository $userRepository): UserAvatar
    {
        /** @var User $user */
        $user = $security->getUser();

        $uploadedFile = $fileUploader->uploadFile($request);

        if (in_array('ROLE_ADMIN', $user->getRoles()) && $request->get('userId') !== null) {
            /** @var User $user */
            $user = $userRepository->findOneBy(['id' => $request->get('userId')]);
        }

        if ($user->getUserAvatar() instanceof UserAvatar) {
            throw new ConflictHttpException('This user already has an avatar, please delete old one before');
        }

        $userAvatar = new UserAvatar();
        $userAvatar->imageFile = $uploadedFile;
        $userAvatar->setUser($user);

        return $userAvatar;
    }
}
