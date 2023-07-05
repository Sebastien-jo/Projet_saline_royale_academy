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
 *
 * @phpstan-method        Proxy<Masterclass> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<Masterclass> createOne(array $attributes = [])
 * @phpstan-method static Proxy<Masterclass> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<Masterclass> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<Masterclass> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<Masterclass> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<Masterclass> random(array $attributes = [])
 * @phpstan-method static Proxy<Masterclass> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<Masterclass> repository()
 * @phpstan-method static list<Proxy<Masterclass>> all()
 * @phpstan-method static list<Proxy<Masterclass>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<Masterclass>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<Masterclass>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<Masterclass>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<Masterclass>> randomSet(int $number, array $attributes = [])
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
