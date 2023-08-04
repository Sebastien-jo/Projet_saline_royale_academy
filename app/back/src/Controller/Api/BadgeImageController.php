<?php

namespace App\Controller\Api;

use App\Entity\BadgeImage;
use App\Repository\BadgeRepository;
use App\Services\FileUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[AsController]
class BadgeImageController
{
    public function __invoke(Request $request, FileUploader $fileUploader, BadgeRepository $badgeRepository): BadgeImage
    {
        $badge = $badgeRepository->findOneBy(['id' => $request->get('badge')]);
        $uploadedFile = $fileUploader->uploadFile($request);

        if (!$badge instanceof \App\Entity\Badge) {
            throw new NotFoundHttpException();
        }

        $badgeImage = new BadgeImage();
        $badgeImage->imageFile = $uploadedFile;
        $badgeImage->setBadge($badge);

        return $badgeImage;
    }
}
