<?php

namespace App\Factory\Translation;

use App\Entity\Translation\BadgeTranslation;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<BadgeTranslation>
 *
 * @method        BadgeTranslation|Proxy           create(array|callable $attributes = [])
 * @method static BadgeTranslation|Proxy           createOne(array $attributes = [])
 * @method static BadgeTranslation|Proxy           find(object|array|mixed $criteria)
 * @method static BadgeTranslation|Proxy           findOrCreate(array $attributes)
 * @method static BadgeTranslation|Proxy           first(string $sortedField = 'id')
 * @method static BadgeTranslation|Proxy           last(string $sortedField = 'id')
 * @method static BadgeTranslation|Proxy           random(array $attributes = [])
 * @method static BadgeTranslation|Proxy           randomOrCreate(array $attributes = [])
 * @method static EntityRepository|RepositoryProxy repository()
 * @method static BadgeTranslation[]|Proxy[]       all()
 * @method static BadgeTranslation[]|Proxy[]       createMany(int $number, array|callable $attributes = [])
 * @method static BadgeTranslation[]|Proxy[]       createSequence(iterable|callable $sequence)
 * @method static BadgeTranslation[]|Proxy[]       findBy(array $attributes)
 * @method static BadgeTranslation[]|Proxy[]       randomRange(int $min, int $max, array $attributes = [])
 * @method static BadgeTranslation[]|Proxy[]       randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<BadgeTranslation> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<BadgeTranslation> createOne(array $attributes = [])
 * @phpstan-method static Proxy<BadgeTranslation> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<BadgeTranslation> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<BadgeTranslation> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<BadgeTranslation> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<BadgeTranslation> random(array $attributes = [])
 * @phpstan-method static Proxy<BadgeTranslation> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<BadgeTranslation> repository()
 * @phpstan-method static list<Proxy<BadgeTranslation>> all()
 * @phpstan-method static list<Proxy<BadgeTranslation>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<BadgeTranslation>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<BadgeTranslation>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<BadgeTranslation>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<BadgeTranslation>> randomSet(int $number, array $attributes = [])
 */
final class BadgeTranslationFactory extends ModelFactory
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
            'locale' => self::faker()->locale(),
            'name' => self::faker()->text(255),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        //         ->afterInstantiate(function(BadgeTranslation $badgeTranslation): void {
        //             $badgeTranslation->setLocale(self::faker()->locale());
        //    });
    }

    protected static function getClass(): string
    {
        return BadgeTranslation::class;
    }
}
