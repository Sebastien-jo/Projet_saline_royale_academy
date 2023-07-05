<?php

namespace App\Factory;

use Doctrine\ORM\EntityRepository;
use Vich\UploaderBundle\Entity\File;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<File>
 *
 * @method        File|Proxy                       create(array|callable $attributes = [])
 * @method static File|Proxy                       createOne(array $attributes = [])
 * @method static File|Proxy                       find(object|array|mixed $criteria)
 * @method static File|Proxy                       findOrCreate(array $attributes)
 * @method static File|Proxy                       first(string $sortedField = 'id')
 * @method static File|Proxy                       last(string $sortedField = 'id')
 * @method static File|Proxy                       random(array $attributes = [])
 * @method static File|Proxy                       randomOrCreate(array $attributes = [])
 * @method static EntityRepository|RepositoryProxy repository()
 * @method static File[]|Proxy[]                   all()
 * @method static File[]|Proxy[]                   createMany(int $number, array|callable $attributes = [])
 * @method static File[]|Proxy[]                   createSequence(iterable|callable $sequence)
 * @method static File[]|Proxy[]                   findBy(array $attributes)
 * @method static File[]|Proxy[]                   randomRange(int $min, int $max, array $attributes = [])
 * @method static File[]|Proxy[]                   randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<File> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<File> createOne(array $attributes = [])
 * @phpstan-method static Proxy<File> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<File> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<File> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<File> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<File> random(array $attributes = [])
 * @phpstan-method static Proxy<File> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<File> repository()
 * @phpstan-method static list<Proxy<File>> all()
 * @phpstan-method static list<Proxy<File>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<File>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<File>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<File>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<File>> randomSet(int $number, array $attributes = [])
 */
final class FileFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(File $file): void {})
    }

    protected static function getClass(): string
    {
        return File::class;
    }
}
