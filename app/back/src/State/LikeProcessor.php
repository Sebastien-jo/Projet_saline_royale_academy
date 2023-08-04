<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Forum;
use App\Entity\Like;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

readonly class LikeProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $persistProcessor,
        private ProcessorInterface $removeProcessor,
        private Security $security,
        private EntityManagerInterface $entityManager,
    ) {
    }

    /**
     * @param Forum        $data
     * @param array<mixed> $uriVariables
     * @param array<mixed> $context
     *
     * @throws Exception
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        /** @var Like $object */
        $object = $data;
        $idForum = $uriVariables['id'];
        $forum = $this->entityManager->getRepository(Forum::class)->find($idForum);
        if (!$forum instanceof \App\Entity\Forum) {
            throw new NotFoundResourceException('Forum does not exist');
        }

        /** @var User $user */
        $user = $this->security->getUser();

        if ($operation instanceof DeleteOperationInterface) {
            if ($data->getId() === null) {
                throw new NotFoundResourceException('Like does not exist');
            }

            $this->removeProcessor->process($object, $operation, $uriVariables, $context);

            return new JsonResponse(['status' => 'ok']);
        }

        if ($data->getId() !== null) {
            throw new NotFoundResourceException('Like already exist');
        }

        $object->setUser($user);
        $object->setForum($forum);

        $this->persistProcessor->process($object, $operation, $uriVariables, $context);

        return new JsonResponse(['status' => 'ok']);
    }
}
