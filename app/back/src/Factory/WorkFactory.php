<?php

namespace App\Factory;

use App\Entity\Work;
use App\Repository\WorkRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Work>
 *
 * @method        Work|Proxy                     create(array|callable $attributes = [])
 * @method static Work|Proxy                     createOne(array $attributes = [])
 * @method static Work|Proxy                     find(object|array|mixed $criteria)
 * @method static Work|Proxy                     findOrCreate(array $attributes)
 * @method static Work|Proxy                     first(string $sortedField = 'id')
 * @method static Work|Proxy                     last(string $sortedField = 'id')
 * @method static Work|Proxy                     random(array $attributes = [])
 * @method static Work|Proxy                     randomOrCreate(array $attributes = [])
 * @method static WorkRepository|RepositoryProxy repository()
 * @method static Work[]|Proxy[]                 all()
 * @method static Work[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Work[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Work[]|Proxy[]                 findBy(array $attributes)
 * @method static Work[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Work[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class WorkFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'name' => self::faker()->name(),
            'category' => CategoryFactory::random(),
            'date' => self::faker()->dateTime(),
            'composer'=> ComposerFactory::random(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(Work $work): void {})
    }

    protected static function getClass(): string
    {
        return Work::class;
    }
}
