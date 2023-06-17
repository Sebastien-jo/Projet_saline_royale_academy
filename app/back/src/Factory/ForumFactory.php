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
 *
 * @phpstan-method        Proxy<Forum> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<Forum> createOne(array $attributes = [])
 * @phpstan-method static Proxy<Forum> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<Forum> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<Forum> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<Forum> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<Forum> random(array $attributes = [])
 * @phpstan-method static Proxy<Forum> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<Forum> repository()
 * @phpstan-method static list<Proxy<Forum>> all()
 * @phpstan-method static list<Proxy<Forum>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<Forum>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<Forum>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<Forum>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<Forum>> randomSet(int $number, array $attributes = [])
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
            'name' => self::faker()->text(255),
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
