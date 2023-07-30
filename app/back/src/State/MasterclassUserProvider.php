<?php

namespace App\State;

use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\MasterclassUser;
use App\Repository\MasterclassUserRepository;
use Symfony\Bundle\SecurityBundle\Security;

class MasterclassUserProvider implements ProviderInterface
{
    public function __construct(private readonly Security $security, private readonly MasterclassUserRepository $repository)
    {
    }

    /**
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @return object|array<MasterclassUser>|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if ($operation instanceof CollectionOperationInterface) {
            if ($this->security->isGranted('ROLE_ADMIN')) {
                return $this->repository->findAll();
            } else {
                return $this->repository->findBy(['user' => $this->security->getUser()]);
            }
        }

        return null;
    }
}
