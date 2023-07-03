<?php

namespace App\Command\Service\Api;

use App\Command\Interface\ComposerFetcherInterface;
use JsonException;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

readonly class CompositeComposerFetcher implements ComposerFetcherInterface
{
    public function __construct(private OpenopusService $api1DataFetcher, private FileComposerFetcher $api2DataFetcher)
    {
    }

    /**
     * {@inheritdoc}
     *
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ClientExceptionInterface
     * @throws JsonException
     */
    public function fetchData(): array
    {
        $data1 = $this->api1DataFetcher->fetchData();
        $data2 = $this->api2DataFetcher->fetchData();

        return array_merge($data1, $data2);
    }
}
