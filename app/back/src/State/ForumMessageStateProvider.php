<?php

namespace App\State;

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
        return $this->repository->finbByForumId($uriVariables['id']);
    }
}
