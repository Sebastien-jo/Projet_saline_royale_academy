<?php

namespace App\Factory;

use App\Entity\QuizResponse;
use App\Repository\QuizResponseRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<QuizResponse>
 *
 * @method        QuizResponse|Proxy                     create(array|callable $attributes = [])
 * @method static QuizResponse|Proxy                     createOne(array $attributes = [])
 * @method static QuizResponse|Proxy                     find(object|array|mixed $criteria)
 * @method static QuizResponse|Proxy                     findOrCreate(array $attributes)
 * @method static QuizResponse|Proxy                     first(string $sortedField = 'id')
 * @method static QuizResponse|Proxy                     last(string $sortedField = 'id')
 * @method static QuizResponse|Proxy                     random(array $attributes = [])
 * @method static QuizResponse|Proxy                     randomOrCreate(array $attributes = [])
 * @method static QuizResponseRepository|RepositoryProxy repository()
 * @method static QuizResponse[]|Proxy[]                 all()
 * @method static QuizResponse[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static QuizResponse[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static QuizResponse[]|Proxy[]                 findBy(array $attributes)
 * @method static QuizResponse[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static QuizResponse[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<QuizResponse> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<QuizResponse> createOne(array $attributes = [])
 * @phpstan-method static Proxy<QuizResponse> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<QuizResponse> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<QuizResponse> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<QuizResponse> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<QuizResponse> random(array $attributes = [])
 * @phpstan-method static Proxy<QuizResponse> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<QuizResponse> repository()
 * @phpstan-method static list<Proxy<QuizResponse>> all()
 * @phpstan-method static list<Proxy<QuizResponse>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<QuizResponse>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<QuizResponse>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<QuizResponse>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<QuizResponse>> randomSet(int $number, array $attributes = [])
 */
final class QuizResponseFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'question' => QuizQuestionFactory::new(),
            'user' => UserFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(QuizResponse $quizResponse): void {})
    }

    protected static function getClass(): string
    {
        return QuizResponse::class;
    }
}
