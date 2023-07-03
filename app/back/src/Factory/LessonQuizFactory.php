<?php

namespace App\Factory;

use App\Entity\LessonQuiz;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<LessonQuiz>
 *
 * @method        LessonQuiz|Proxy                 create(array|callable $attributes = [])
 * @method static LessonQuiz|Proxy                 createOne(array $attributes = [])
 * @method static LessonQuiz|Proxy                 find(object|array|mixed $criteria)
 * @method static LessonQuiz|Proxy                 findOrCreate(array $attributes)
 * @method static LessonQuiz|Proxy                 first(string $sortedField = 'id')
 * @method static LessonQuiz|Proxy                 last(string $sortedField = 'id')
 * @method static LessonQuiz|Proxy                 random(array $attributes = [])
 * @method static LessonQuiz|Proxy                 randomOrCreate(array $attributes = [])
 * @method static EntityRepository|RepositoryProxy repository()
 * @method static LessonQuiz[]|Proxy[]             all()
 * @method static LessonQuiz[]|Proxy[]             createMany(int $number, array|callable $attributes = [])
 * @method static LessonQuiz[]|Proxy[]             createSequence(iterable|callable $sequence)
 * @method static LessonQuiz[]|Proxy[]             findBy(array $attributes)
 * @method static LessonQuiz[]|Proxy[]             randomRange(int $min, int $max, array $attributes = [])
 * @method static LessonQuiz[]|Proxy[]             randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<LessonQuiz> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<LessonQuiz> createOne(array $attributes = [])
 * @phpstan-method static Proxy<LessonQuiz> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<LessonQuiz> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<LessonQuiz> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<LessonQuiz> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<LessonQuiz> random(array $attributes = [])
 * @phpstan-method static Proxy<LessonQuiz> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<LessonQuiz> repository()
 * @phpstan-method static list<Proxy<LessonQuiz>> all()
 * @phpstan-method static list<Proxy<LessonQuiz>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<LessonQuiz>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<LessonQuiz>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<LessonQuiz>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<LessonQuiz>> randomSet(int $number, array $attributes = [])
 */
final class LessonQuizFactory extends ModelFactory
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
            'section' => SectionFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(LessonQuiz $lessonQuiz): void {})
    }

    protected static function getClass(): string
    {
        return LessonQuiz::class;
    }
}
