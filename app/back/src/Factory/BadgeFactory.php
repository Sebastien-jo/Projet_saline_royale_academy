<?php

namespace App\Factory;

use App\Entity\Badge;
use App\Repository\BadgeRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Badge>
 *
 * @method        Badge|Proxy                     create(array|callable $attributes = [])
 * @method static Badge|Proxy                     createOne(array $attributes = [])
 * @method static Badge|Proxy                     find(object|array|mixed $criteria)
 * @method static Badge|Proxy                     findOrCreate(array $attributes)
 * @method static Badge|Proxy                     first(string $sortedField = 'id')
 * @method static Badge|Proxy                     last(string $sortedField = 'id')
 * @method static Badge|Proxy                     random(array $attributes = [])
 * @method static Badge|Proxy                     randomOrCreate(array $attributes = [])
 * @method static BadgeRepository|RepositoryProxy repository()
 * @method static Badge[]|Proxy[]                 all()
 * @method static Badge[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Badge[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Badge[]|Proxy[]                 findBy(array $attributes)
 * @method static Badge[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Badge[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<Badge> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<Badge> createOne(array $attributes = [])
 * @phpstan-method static Proxy<Badge> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<Badge> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<Badge> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<Badge> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<Badge> random(array $attributes = [])
 * @phpstan-method static Proxy<Badge> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<Badge> repository()
 * @phpstan-method static list<Proxy<Badge>> all()
 * @phpstan-method static list<Proxy<Badge>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<Badge>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<Badge>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<Badge>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<Badge>> randomSet(int $number, array $attributes = [])
 */
final class BadgeFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'description' => self::faker()->text(),
            'image_path' => self::faker()->imageUrl(80, 80),
            'name' => self::faker()->userName(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
            // ->afterInstantiate(function(Badge $badge): void {})
    }

    protected static function getClass(): string
    {
        return Badge::class;
    }
}
