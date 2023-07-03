<?php

namespace App\Command\Service\Api;

use App\Command\Interface\ComposerFetcherInterface;
use App\Entity\Traits\ConvertKeyTrait;
use App\Model\ComposerModel;
use JsonException;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class FileComposerFetcher implements ComposerFetcherInterface
{
    use ConvertKeyTrait;

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ClientExceptionInterface
     * @throws JsonException
     */
    public function fetchData(): array
    {
        $httpClient = HttpClient::create();
        $response = $httpClient->request('GET', 'https://api.openopus.org/composer/list/epoch/Classical.json');
        $statusCode = $response->getStatusCode();
        $composerList = [];

        if ($statusCode === 200) {
            $content = $response->getContent();
            $content = json_decode($content, true, 512, 0);
            foreach ($content['composers'] as $composer) {
                $composerList[] = $this->convertKey($composer, ComposerModel::openpusHydrateException);
            }
        }

        return $composerList;
    }
}
