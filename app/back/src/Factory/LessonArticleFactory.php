<?php

namespace App\Factory;

use App\Entity\Lesson\LessonArticle;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<LessonArticle>
 *
 * @method        LessonArticle|Proxy              create(array|callable $attributes = [])
 * @method static LessonArticle|Proxy              createOne(array $attributes = [])
 * @method static LessonArticle|Proxy              find(object|array|mixed $criteria)
 * @method static LessonArticle|Proxy              findOrCreate(array $attributes)
 * @method static LessonArticle|Proxy              first(string $sortedField = 'id')
 * @method static LessonArticle|Proxy              last(string $sortedField = 'id')
 * @method static LessonArticle|Proxy              random(array $attributes = [])
 * @method static LessonArticle|Proxy              randomOrCreate(array $attributes = [])
 * @method static EntityRepository|RepositoryProxy repository()
 * @method static LessonArticle[]|Proxy[]          all()
 * @method static LessonArticle[]|Proxy[]          createMany(int $number, array|callable $attributes = [])
 * @method static LessonArticle[]|Proxy[]          createSequence(iterable|callable $sequence)
 * @method static LessonArticle[]|Proxy[]          findBy(array $attributes)
 * @method static LessonArticle[]|Proxy[]          randomRange(int $min, int $max, array $attributes = [])
 * @method static LessonArticle[]|Proxy[]          randomSet(int $number, array $attributes = [])
 */
final class LessonArticleFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'content' => self::faker()->text(),
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
        // ->afterInstantiate(function(LessonArticle $lessonArticle): void {})
    }

    protected static function getClass(): string
    {
        return LessonArticle::class;
    }
}
