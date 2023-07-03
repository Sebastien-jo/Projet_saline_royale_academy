<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

#[AsController]
class StatUserController extends AbstractController
{
    public function __construct(private readonly Security $security, private readonly NormalizerInterface $normalizer)
    {
    }

    /**
     * @throws ExceptionInterface
     */
    #[Route(
        '/api/users/stats',
        name: 'api:user:stat',
        defaults: [
            '_api_resource_class' => User::class,
            '_api_operation_name' => 'api:user:stat',
        ],
        methods: ['GET']
    )]
    public function getStats(): JsonResponse
    {
        $user = $this->security->getUser();
        $normalize = $this->normalizer->normalize($user, null, ['groups' => ['user:stats']]);

        return new JsonResponse($normalize);
    }
}
