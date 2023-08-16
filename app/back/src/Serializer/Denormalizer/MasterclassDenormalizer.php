<?php

namespace App\Serializer\Denormalizer;

use ApiPlatform\Api\UrlGeneratorInterface;
use App\Entity\Masterclass;
use App\Entity\Section;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

/**
 * @method getSupportedTypes(?string $format)
 */
final class MasterclassDenormalizer implements DenormalizerInterface, DenormalizerAwareInterface
{
    use DenormalizerAwareTrait;

    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly UrlGeneratorInterface $urlGenerator
    ) {
    }

    /**
     * {@inheritdoc}
     *
     * @param array<mixed> $context
     */
    public function denormalize($data, string $type, string $format = null, array $context = []): Masterclass
    {
        $array = [];
        $sections = $this->denormalizer->denormalize(
            $data['sectionsContent'],
            Section::class . '[]',
            $format,
            $context
        );
        unset($data['sectionsContent']);

        foreach ($sections as $section) {
            $this->em->persist($section);
            $this->em->flush();
            $array[] = $this->urlGenerator->generate('api_sections_get_item', ['id' => $section->getId()]);
        }

        $data['sections'] = $array;

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
            Masterclass::class,
            true
        ) && isset($data['sectionsContent']);
    }
}
