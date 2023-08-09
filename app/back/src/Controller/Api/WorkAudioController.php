<?php

namespace App\Controller\Api;

use App\Entity\Work;
use App\Entity\WorkAudio;
use App\Repository\WorkRepository;
use App\Services\FileUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[AsController]
class WorkAudioController
{
    public function __invoke(Request $request, FileUploader $fileUploader, WorkRepository $workRepository): WorkAudio
    {
        $work = $workRepository->findOneBy(['id' => $request->get('work')]);
        $uploadedFile = $fileUploader->uploadFile($request);

        if (!$work instanceof Work) {
            throw new NotFoundHttpException();
        }

        $workAudio = new WorkAudio();
        $workAudio->audioFile = $uploadedFile;
        $workAudio->setWork($work);

        return $workAudio;
    }
}
