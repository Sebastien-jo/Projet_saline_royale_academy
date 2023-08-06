<?php

namespace App\Filter;

use ApiPlatform\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;

final class DiscriminatorFilter extends AbstractFilter
{
    /**
     * {@inheritdoc}
     *
     * @param array<mixed> $context
     * @param mixed        $value
     */
    protected function filterProperty(
        string $property,
        $value,
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        Operation $operation = null,
        array $context = []
    ): void {
        // otherwise filter is applied to order and page as well
        if (
            !$this->isPropertyEnabled($property, $resourceClass)
            || $this->isPropertyMapped($property, $resourceClass)
        ) {
            return;
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $parameterName = $queryNameGenerator->generateParameterName($property); // Generate a unique parameter name to avoid collisions with other filters

        $queryBuilder
                ->andWhere(sprintf('%s INSTANCE OF :%s', $rootAlias, $parameterName))
                ->setParameter($parameterName, $value)
        ;
    }

    /**
     * {@inheritdoc}
     *
     * @return array<mixed>
     */
    public function getDescription(string $resourceClass): array
    {
        if (!$this->properties) {
            return [];
        }
        $description = [];
        foreach (array_keys($this->properties) as $property) {
            $description["regexp_$property"] = [
                'property' => $property,
                'type' => Type::BUILTIN_TYPE_STRING,
                'required' => false,
                'description' => 'Filter using a regex. This will appear in the OpenApi documentation!',
                'openapi' => [
                    'example' => 'Custom example that will be in the documentation and be the default value of the sandbox',
                    'allowReserved' => false, // if true, query parameters will be not percent-encoded
                    'allowEmptyValue' => false,
                    'explode' => false,
                    // to be true, the type must be Type::BUILTIN_TYPE_ARRAY, ?product=blue,green will be ?product=blue&product=green
                ],
            ];
        }

        return $description;
    }
}
