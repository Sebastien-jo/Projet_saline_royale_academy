<?php

namespace App\Factory;

use App\Entity\LessonExercise;
use Doctrine\ORM\EntityRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<LessonExercise>
 *
 * @method        LessonExercise|Proxy             create(array|callable $attributes = [])
 * @method static LessonExercise|Proxy             createOne(array $attributes = [])
 * @method static LessonExercise|Proxy             find(object|array|mixed $criteria)
 * @method static LessonExercise|Proxy             findOrCreate(array $attributes)
 * @method static LessonExercise|Proxy             first(string $sortedField = 'id')
 * @method static LessonExercise|Proxy             last(string $sortedField = 'id')
 * @method static LessonExercise|Proxy             random(array $attributes = [])
 * @method static LessonExercise|Proxy             randomOrCreate(array $attributes = [])
 * @method static EntityRepository|RepositoryProxy repository()
 * @method static LessonExercise[]|Proxy[]         all()
 * @method static LessonExercise[]|Proxy[]         createMany(int $number, array|callable $attributes = [])
 * @method static LessonExercise[]|Proxy[]         createSequence(iterable|callable $sequence)
 * @method static LessonExercise[]|Proxy[]         findBy(array $attributes)
 * @method static LessonExercise[]|Proxy[]         randomRange(int $min, int $max, array $attributes = [])
 * @method static LessonExercise[]|Proxy[]         randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<LessonExercise> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<LessonExercise> createOne(array $attributes = [])
 * @phpstan-method static Proxy<LessonExercise> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<LessonExercise> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<LessonExercise> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<LessonExercise> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<LessonExercise> random(array $attributes = [])
 * @phpstan-method static Proxy<LessonExercise> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<LessonExercise> repository()
 * @phpstan-method static list<Proxy<LessonQuiz>> all()
 * @phpstan-method static list<Proxy<LessonQuiz>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<LessonQuiz>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<LessonQuiz>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<LessonQuiz>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<LessonQuiz>> randomSet(int $number, array $attributes = [])
 */
final class LessonExerciseFactory extends ModelFactory
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
        return LessonExercise::class;
    }
}
