<?php

namespace App\State;

use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Composer;
use App\Entity\User;
use App\Repository\ComposerRepository;
use Symfony\Bundle\SecurityBundle\Security;

readonly class ComposerProvider implements ProviderInterface
{
    public function __construct(private Security $security, private ComposerRepository $repository)
    {
    }

    /**
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @return object|array<Composer>|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        /**
         * @var User $user
         */
        $user = $this->security->getUser();

        /**
         * @var int $id
         */
        $id = $uriVariables['id'] ?? null;

        if ($user->getId() !== null) {
            if ($operation instanceof CollectionOperationInterface) {
                return $this->repository->FindAllWithFavorite($user->getId());
            } else {
                return $this->repository->FindWithFavorite($id, $user->getId());
            }
        }

        if ($operation instanceof CollectionOperationInterface) {
            return $this->repository->findAll();
        } else {
            return $this->repository->find($id);
        }
    }
}
