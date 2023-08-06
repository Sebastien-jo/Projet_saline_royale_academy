<?php

namespace App\Controller\Api;

use App\Entity\Work;
use App\Entity\WorkAudio;
use App\Entity\WorkScore;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class WorkController
{
    public function __invoke(Request $request): Work
    {
        /** @var Work $work */
        $work = $request->attributes->get('data');

        if ($request->files->get('workAudio') !== null) {
            $workAudio = new WorkAudio();
            $workAudio->audioFile = $request->files->get('workAudio');
            $work->setWorkAudio($workAudio);
        }

        if ($request->files->get('workScores') !== null) {
            $workScores = [$request->files->get('workScores')];

            foreach ($workScores as $workScore) {
                $workScore = new WorkScore();
                $workScore->workFile = $request->files->get('workScores');
                $work->addWorkScore($workScore);
            }
        }

        return $work;
    }
}
