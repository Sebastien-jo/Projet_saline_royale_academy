<?php

namespace App\Factory;

use App\Entity\Masterclass;
use App\Repository\MasterclassRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Masterclass>
 *
 * @method        Masterclass|Proxy                     create(array|callable $attributes = [])
 * @method static Masterclass|Proxy                     createOne(array $attributes = [])
 * @method static Masterclass|Proxy                     find(object|array|mixed $criteria)
 * @method static Masterclass|Proxy                     findOrCreate(array $attributes)
 * @method static Masterclass|Proxy                     first(string $sortedField = 'id')
 * @method static Masterclass|Proxy                     last(string $sortedField = 'id')
 * @method static Masterclass|Proxy                     random(array $attributes = [])
 * @method static Masterclass|Proxy                     randomOrCreate(array $attributes = [])
 * @method static MasterclassRepository|RepositoryProxy repository()
 * @method static Masterclass[]|Proxy[]                 all()
 * @method static Masterclass[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Masterclass[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Masterclass[]|Proxy[]                 findBy(array $attributes)
 * @method static Masterclass[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Masterclass[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class MasterclassFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'name' => self::faker()->text(20),
            'teacher' => UserFactory::new(['roles' => ['TEACHER']]),
            'work' => WorkFactory::random(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(Masterclass $masterclass): void {})
    }

    protected static function getClass(): string
    {
        return Masterclass::class;
    }
}
