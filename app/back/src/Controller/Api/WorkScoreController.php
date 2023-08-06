<?php

namespace App\Controller\Api;

use App\Entity\Work;
use App\Entity\WorkScore;
use App\Repository\WorkRepository;
use App\Services\FileUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[AsController]
class WorkScoreController
{
    public function __invoke(Request $request, FileUploader $fileUploader, WorkRepository $workRepository): WorkScore
    {
        $work = $workRepository->findOneBy(['id' => $request->get('work')]);
        $uploadedFile = $fileUploader->uploadFile($request);

        if (!$work instanceof Work) {
            throw new NotFoundHttpException();
        }

        $workScore = new WorkScore();
        $workScore->workFile = $uploadedFile;
        $workScore->setWork($work);

        return $workScore;
    }
}
