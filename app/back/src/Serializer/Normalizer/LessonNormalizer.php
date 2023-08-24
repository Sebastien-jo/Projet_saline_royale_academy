<?php

namespace App\Serializer\Normalizer;

use App\Entity\Lesson\Lesson;
use ArrayObject;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * @method getSupportedTypes(?string $format)
 */
final class LessonNormalizer implements NormalizerInterface
{
    use NormalizerAwareTrait;

    public function __construct(
        private readonly ObjectNormalizer $objectNormalizer,
    ) {
    }

    /**
     * @param array<mixed> $context
     *
     * @return float|array<string>|ArrayObject|bool|int|string|null
     *
     * @throws ExceptionInterface
     */
    public function normalize(mixed $object, string $format = null, array $context = []): float|array|ArrayObject|bool|int|string|null
    {
        $this->setNormalizer($this->objectNormalizer);

        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization(mixed $data, string $format = null): bool
    {
        return $data instanceof Lesson;
    }
}
