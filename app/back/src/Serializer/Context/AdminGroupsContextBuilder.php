<?php

namespace App\Serializer\Context;

use ApiPlatform\Serializer\SerializerContextBuilderInterface;
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

#[AsDecorator('api_platform.serializer.context_builder')] final readonly class AdminGroupsContextBuilder implements SerializerContextBuilderInterface
{
    public function __construct(
        private SerializerContextBuilderInterface $decorated,
        private AuthorizationCheckerInterface $authorizationChecker
    ) {
    }

    /**
     * @param array<mixed>|null $extractedAttributes
     *
     * @return array<mixed>
     */
    public function createFromRequest(Request $request, bool $normalization, array $extractedAttributes = null): array
    {
        $context = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);

        if (isset($context['groups']) && $this->authorizationChecker->isGranted('ROLE_ADMIN')) {
            $context['groups'][] = $normalization ? 'admin:read' : 'admin:write';
        } elseif (isset($context['groups']) && $this->authorizationChecker->isGranted('ROLE_TEACHER')) {
            $context['groups'][] = $normalization ? 'teacher:read' : 'teacher:write';
        } else {
            $context['groups'][] = $normalization ? 'user:read' : 'user:write';
        }

        return $context;
    }
}
