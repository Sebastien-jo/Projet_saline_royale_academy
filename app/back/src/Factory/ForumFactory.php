<?php

namespace App\Factory;

use App\Entity\Forum;
use App\Repository\ForumRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Forum>
 *
 * @method        Forum|Proxy                     create(array|callable $attributes = [])
 * @method static Forum|Proxy                     createOne(array $attributes = [])
 * @method static Forum|Proxy                     find(object|array|mixed $criteria)
 * @method static Forum|Proxy                     findOrCreate(array $attributes)
 * @method static Forum|Proxy                     first(string $sortedField = 'id')
 * @method static Forum|Proxy                     last(string $sortedField = 'id')
 * @method static Forum|Proxy                     random(array $attributes = [])
 * @method static Forum|Proxy                     randomOrCreate(array $attributes = [])
 * @method static ForumRepository|RepositoryProxy repository()
 * @method static Forum[]|Proxy[]                 all()
 * @method static Forum[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Forum[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Forum[]|Proxy[]                 findBy(array $attributes)
 * @method static Forum[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Forum[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class ForumFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'createdAt' => self::faker()->dateTime(),
            'title' => self::faker()->text(255),
            'description' => self::faker()->text(255),
            'updatedAt' => self::faker()->dateTime(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(Forum $forum): void {})
    }

    protected static function getClass(): string
    {
        return Forum::class;
    }
}
