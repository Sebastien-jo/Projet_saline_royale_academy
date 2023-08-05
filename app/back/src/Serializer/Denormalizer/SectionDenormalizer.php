<?php

namespace App\Serializer\Denormalizer;

use ApiPlatform\Api\UrlGeneratorInterface;
use App\Entity\Section;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

final class SectionDenormalizer implements DenormalizerInterface, DenormalizerAwareInterface
{
    use DenormalizerAwareTrait;

    public function __construct(private readonly UrlGeneratorInterface $urlGenerator, private readonly EntityManagerInterface $em)
    {
    }

    /**
     * {@inheritdoc}
     *
     * @param array<mixed> $context
     */
    public function denormalize($data, string $type, string $format = null, array $context = []): Section
    {
        $array = [];
        $lessons = $this->denormalizer->denormalize(
            $data['lessonsContent'],
            'App\Entity\Lesson\Lesson[]',
            $format,
            $context + [self::class => true]
        );
        unset($data['lessonsContent']);
        foreach ($lessons as $lesson) {
            $this->em->persist($lesson);
            $this->em->flush();
            $array[] = $this->urlGenerator->generate('api_lessons_get_item', ['id' => $lesson->getId()]);
        }

        $data['lessons'] = $array;

        return $this->denormalizer->denormalize($data, $type, $format, $context + [self::class => true]);
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDenormalization($data, $type, $format = null): bool
    {
        /* @phpstan-ignore-next-line */
        return in_array($format, ['json', 'jsonld'], true) && is_a(
            $type,
            Section::class,
            true
        ) && isset($data['lessonsContent']);
    }
}
