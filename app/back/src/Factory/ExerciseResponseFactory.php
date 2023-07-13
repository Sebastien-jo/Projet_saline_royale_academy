<?php

namespace App\Factory;

use App\Entity\ExerciseResponse;
use App\Repository\ExerciseResponseRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<ExerciseResponse>
 *
 * @method        ExerciseResponse|Proxy                     create(array|callable $attributes = [])
 * @method static ExerciseResponse|Proxy                     createOne(array $attributes = [])
 * @method static ExerciseResponse|Proxy                     find(object|array|mixed $criteria)
 * @method static ExerciseResponse|Proxy                     findOrCreate(array $attributes)
 * @method static ExerciseResponse|Proxy                     first(string $sortedField = 'id')
 * @method static ExerciseResponse|Proxy                     last(string $sortedField = 'id')
 * @method static ExerciseResponse|Proxy                     random(array $attributes = [])
 * @method static ExerciseResponse|Proxy                     randomOrCreate(array $attributes = [])
 * @method static ExerciseResponseRepository|RepositoryProxy repository()
 * @method static ExerciseResponse[]|Proxy[]                 all()
 * @method static ExerciseResponse[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static ExerciseResponse[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static ExerciseResponse[]|Proxy[]                 findBy(array $attributes)
 * @method static ExerciseResponse[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static ExerciseResponse[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class ExerciseResponseFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'lessonExercise' => LessonExerciseFactory::new(),
            'user' => UserFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(ExerciseResponse $exerciseResponse): void {})
    }

    protected static function getClass(): string
    {
        return ExerciseResponse::class;
    }
}
