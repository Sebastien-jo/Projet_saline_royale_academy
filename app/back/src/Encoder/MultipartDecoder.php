<?php

// api/src/Encoder/MultipartDecoder.php

namespace App\Encoder;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Serializer\Encoder\DecoderInterface;

use function is_array;

final readonly class MultipartDecoder implements DecoderInterface
{
    public const FORMAT = 'multipart';

    public function __construct(private RequestStack $requestStack)
    {
    }

    /**
     * {@inheritdoc}
     *
     * @param array<mixed> $context
     */
    public function decode(string $data, string $format, array $context = []): mixed
    {
        $request = $this->requestStack->getCurrentRequest();

        if (!$request instanceof \Symfony\Component\HttpFoundation\Request) {
            return null;
        }

        return array_map(static function (string $element) {
            // Multipart form values will be encoded in JSON.
            $decoded = json_decode($element, true, 512, 0);

            return is_array($decoded) ? $decoded : $element;
        }, $request->request->all()) + $request->files->all();
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDecoding(string $format): bool
    {
        return self::FORMAT === $format;
    }
}
