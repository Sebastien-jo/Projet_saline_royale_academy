<?php

namespace App\Factory;

use App\Entity\Composer;
use App\Enum\Nationality;
use App\Repository\ComposerRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Composer>
 *
 * @method        Composer|Proxy                     create(array|callable $attributes = [])
 * @method static Composer|Proxy                     createOne(array $attributes = [])
 * @method static Composer|Proxy                     find(object|array|mixed $criteria)
 * @method static Composer|Proxy                     findOrCreate(array $attributes)
 * @method static Composer|Proxy                     first(string $sortedField = 'id')
 * @method static Composer|Proxy                     last(string $sortedField = 'id')
 * @method static Composer|Proxy                     random(array $attributes = [])
 * @method static Composer|Proxy                     randomOrCreate(array $attributes = [])
 * @method static ComposerRepository|RepositoryProxy repository()
 * @method static Composer[]|Proxy[]                 all()
 * @method static Composer[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Composer[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Composer[]|Proxy[]                 findBy(array $attributes)
 * @method static Composer[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Composer[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class ComposerFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     */
    protected function getDefaults(): array
    {
        return [
            'birth' => self::faker()->dateTime(),
            'completeName' => self::faker()->text(255),
            'death' => self::faker()->dateTime(),
            'name' => self::faker()->name(255),
            'nationality' => Nationality::Az,
            'picture' => self::faker()->imageUrl(640, 480, ''),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this
             ->afterInstantiate(function (Composer $composer): void {
                 $composer->setCompleteName($composer->getName() . ' ' . $composer->getName());
             })
        ;
    }

    protected static function getClass(): string
    {
        return Composer::class;
    }
}
