<?php

namespace App\Factory;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Category>
 *
 * @method        Category|Proxy                     create(array|callable $attributes = [])
 * @method static Category|Proxy                     createOne(array $attributes = [])
 * @method static Category|Proxy                     find(object|array|mixed $criteria)
 * @method static Category|Proxy                     findOrCreate(array $attributes)
 * @method static Category|Proxy                     first(string $sortedField = 'id')
 * @method static Category|Proxy                     last(string $sortedField = 'id')
 * @method static Category|Proxy                     random(array $attributes = [])
 * @method static Category|Proxy                     randomOrCreate(array $attributes = [])
 * @method static CategoryRepository|RepositoryProxy repository()
 * @method static Category[]|Proxy[]                 all()
 * @method static Category[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Category[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Category[]|Proxy[]                 findBy(array $attributes)
 * @method static Category[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Category[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<Category> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<Category> createOne(array $attributes = [])
 * @phpstan-method static Proxy<Category> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<Category> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<Category> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<Category> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<Category> random(array $attributes = [])
 * @phpstan-method static Proxy<Category> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<Category> repository()
 * @phpstan-method static list<Proxy<Category>> all()
 * @phpstan-method static list<Proxy<Category>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<Category>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<Category>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<Category>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<Category>> randomSet(int $number, array $attributes = [])
 */
final class CategoryFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'name' => self::faker()->words(1, true),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
            // ->afterInstantiate(function(Category $category): void {})
    }

    protected static function getClass(): string
    {
        return Category::class;
    }
}
