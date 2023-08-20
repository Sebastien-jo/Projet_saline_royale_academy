<?php

namespace App\State;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\ForumMessageRepository;

class ForumMessageStateProvider implements ProviderInterface
{
    public function __construct(private readonly ForumMessageRepository $repository)
    {
    }

    /**
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if ($operation instanceof GetCollection && $operation->getUriTemplate() == '/forums/{id}/messages.{_format}') {
            return $this->repository->finbByForumId($uriVariables['id']);
        }

        if ($operation instanceof Get) {
            return $this->repository->find($uriVariables['id']);
        }

        return null;
    }
}
