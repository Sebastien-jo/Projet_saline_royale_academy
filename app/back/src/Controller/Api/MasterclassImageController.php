<?php

namespace App\Controller\Api;

use App\Entity\MasterclassImage;
use App\Repository\MasterclassRepository;
use App\Services\FileUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[AsController]
class MasterclassImageController
{
    public function __invoke(Request $request, FileUploader $fileUploader, MasterclassRepository $masterclassRepository): MasterclassImage
    {
        $masterclass = $masterclassRepository->findOneBy(['id' => $request->get('masterclass')]);
        $uploadedFile = $fileUploader->uploadFile($request);

        if (!$masterclass instanceof \App\Entity\Masterclass) {
            throw new NotFoundHttpException();
        }

        $masterclassImage = new MasterclassImage();
        $masterclassImage->imageFile = $uploadedFile;
        $masterclassImage->setMasterclass($masterclass);

        return $masterclassImage;
    }
}
