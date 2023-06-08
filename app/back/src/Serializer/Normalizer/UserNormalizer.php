<?php

namespace App\Serializer\Normalizer;

use App\Entity\User;
use ArrayObject;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Vich\UploaderBundle\Storage\StorageInterface;

final class UserNormalizer implements NormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'PRODUCT_OBJECT_NORMALIZER_ALREADY_CALLED';

    public function __construct(private readonly StorageInterface $storage)
    {
    }

    /**
     * {@inheritdoc}
     *
     * @param array<mixed> $context
     *
     * @return array<mixed>|string|int|float|bool|ArrayObject|null
     */
    public function normalize(
        $object,
        string $format = null,
        array $context = []
    ): array|string|int|float|bool|ArrayObject|null {
        $context[self::ALREADY_CALLED] = true;
        $object->contentUrl = $this->storage->resolveUri($object, 'avatar');

        return $this->normalizer->normalize($object, $format, $context);
    }

    /**
     * {@inheritdoc}
     *
     * @param array<mixed> $context
     */
    public function supportsNormalization(mixed $data, string $format = null, array $context = []): bool
    {
        if (isset($context[self::ALREADY_CALLED])) {
            return false;
        }

        return $data instanceof User;
    }
}
