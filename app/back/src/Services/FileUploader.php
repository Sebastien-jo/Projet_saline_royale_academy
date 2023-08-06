<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class FileUploader
{
    public function uploadFile(Request $request): ?File
    {
        $uploadedFile = $request->files->get('file');

        if (!$uploadedFile instanceof File) {
            throw new BadRequestHttpException('"file" is required');
        }

        return $uploadedFile;
    }
}
