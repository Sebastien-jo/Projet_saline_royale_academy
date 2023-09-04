<?php

namespace App\Factory;

use App\Entity\BadgeImage;
use App\Repository\BadgeImageRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<BadgeImage>
 *
 * @method        BadgeImage|Proxy                     create(array|callable $attributes = [])
 * @method static BadgeImage|Proxy                     createOne(array $attributes = [])
 * @method static BadgeImage|Proxy                     find(object|array|mixed $criteria)
 * @method static BadgeImage|Proxy                     findOrCreate(array $attributes)
 * @method static BadgeImage|Proxy                     first(string $sortedField = 'id')
 * @method static BadgeImage|Proxy                     last(string $sortedField = 'id')
 * @method static BadgeImage|Proxy                     random(array $attributes = [])
 * @method static BadgeImage|Proxy                     randomOrCreate(array $attributes = [])
 * @method static BadgeImageRepository|RepositoryProxy repository()
 * @method static BadgeImage[]|Proxy[]                 all()
 * @method static BadgeImage[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static BadgeImage[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static BadgeImage[]|Proxy[]                 findBy(array $attributes)
 * @method static BadgeImage[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static BadgeImage[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class BadgeImageFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'badge' => BadgeFactory::random(),
            'image_path' => self::faker()->imageUrl(80, 80),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(BadgeImage $badgeImage): void {})
    }

    protected static function getClass(): string
    {
        return BadgeImage::class;
    }
}
