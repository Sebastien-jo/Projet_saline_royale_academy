<?php

namespace App\Controller\Api;

use App\Entity\ComposerImage;
use App\Repository\ComposerRepository;
use App\Services\FileUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[AsController]
class ComposerImageController
{
    public function __invoke(Request $request, FileUploader $fileUploader, ComposerRepository $composerRepository): ComposerImage
    {
        $composer = $composerRepository->findOneBy(['id' => $request->get('composer')]);
        $uploadedFile = $fileUploader->uploadFile($request);

        if (!$composer instanceof \App\Entity\Composer) {
            throw new NotFoundHttpException();
        }

        $composerImage = new ComposerImage();
        $composerImage->imageFile = $uploadedFile;
        $composerImage->setComposer($composer);

        return $composerImage;
    }
}
