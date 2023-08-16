<?php

namespace App\Serializer\Denormalizer;

use App\Entity\Lesson\Lesson;
use App\Entity\Lesson\LessonArticle;
use App\Entity\Lesson\LessonExercise;
use App\Entity\Lesson\LessonVideo;
use App\Entity\Section;
use Exception;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

final class LessonDenormalizer implements DenormalizerInterface, DenormalizerAwareInterface
{
    use DenormalizerAwareTrait;

    /**
     * {@inheritdoc}
     *
     * @param array<mixed> $context
     *
     * @return array<Section>
     *
     * @throws Exception
     */
    public function denormalize($data, string $type, string $format = null, array $context = []): array
    {
        $array = [];
        foreach ($data as $lessonContent) {
            switch ($lessonContent['type']) {
                case LessonExercise::TYPE:
                    $lesson = $this->denormalizer->denormalize(
                        $lessonContent,
                        LessonExercise::class,
                        $format,
                        $context
                    );
                    // TODO a ne pas oublier
                    break;
                case LessonVideo::TYPE:
                    $lesson = $this->denormalizer->denormalize(
                        $lessonContent,
                        LessonVideo::class,
                        $format,
                        $context
                    );
                    $lesson->setVideoUrl($lessonContent['videoUrl']);
                    break;
                case LessonArticle::TYPE:
                    $lesson = $this->denormalizer->denormalize(
                        $lessonContent,
                        LessonArticle::class,
                        $format,
                        $context
                    );
                    $lesson->setContent($lessonContent['content']);
                    break;
                default:
                    throw new Exception('Lesson type not found');
            }

            $array[] = $lesson;
        }

        return $array;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDenormalization($data, $type, $format = null): bool
    {
        /* @phpstan-ignore-next-line */
        $bool = in_array(
            $format,
            ['json', 'jsonld'],
            true
        ) && $type === Lesson::class . '[]' && isset($data[0]['type']);

        return $bool;
    }
}
