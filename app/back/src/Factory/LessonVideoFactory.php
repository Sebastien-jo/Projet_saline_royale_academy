<?php

namespace App\Factory;

use App\Entity\Lesson\LessonVideo;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<LessonVideo>
 *
 * @method        LessonVideo|Proxy                create(array|callable $attributes = [])
 * @method static LessonVideo|Proxy                createOne(array $attributes = [])
 * @method static LessonVideo|Proxy                find(object|array|mixed $criteria)
 * @method static LessonVideo|Proxy                findOrCreate(array $attributes)
 * @method static LessonVideo|Proxy                first(string $sortedField = 'id')
 * @method static LessonVideo|Proxy                last(string $sortedField = 'id')
 * @method static LessonVideo|Proxy                random(array $attributes = [])
 * @method static LessonVideo|Proxy                randomOrCreate(array $attributes = [])
 * @method static EntityRepository|RepositoryProxy repository()
 * @method static LessonVideo[]|Proxy[]            all()
 * @method static LessonVideo[]|Proxy[]            createMany(int $number, array|callable $attributes = [])
 * @method static LessonVideo[]|Proxy[]            createSequence(iterable|callable $sequence)
 * @method static LessonVideo[]|Proxy[]            findBy(array $attributes)
 * @method static LessonVideo[]|Proxy[]            randomRange(int $min, int $max, array $attributes = [])
 * @method static LessonVideo[]|Proxy[]            randomSet(int $number, array $attributes = [])
 */
final class LessonVideoFactory extends ModelFactory
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
            'name' => self::faker()->text(255),
            'position' => self::faker()->numberBetween(1, 32767),
            'resume' => self::faker()->text(255),
            'section' => SectionFactory::random(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(LessonVideo $lessonVideo): void {})
    }

    protected static function getClass(): string
    {
        return LessonVideo::class;
    }
}
