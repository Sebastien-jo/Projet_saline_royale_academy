<?php

namespace App\Factory;

use App\Entity\QuizQuestion;
use App\Repository\QuestionRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<QuizQuestion>
 *
 * @method        QuizQuestion|Proxy                 create(array|callable $attributes = [])
 * @method static QuizQuestion|Proxy                 createOne(array $attributes = [])
 * @method static QuizQuestion|Proxy                 find(object|array|mixed $criteria)
 * @method static QuizQuestion|Proxy                 findOrCreate(array $attributes)
 * @method static QuizQuestion|Proxy                 first(string $sortedField = 'id')
 * @method static QuizQuestion|Proxy                 last(string $sortedField = 'id')
 * @method static QuizQuestion|Proxy                 random(array $attributes = [])
 * @method static QuizQuestion|Proxy                 randomOrCreate(array $attributes = [])
 * @method static QuestionRepository|RepositoryProxy repository()
 * @method static QuizQuestion[]|Proxy[]             all()
 * @method static QuizQuestion[]|Proxy[]             createMany(int $number, array|callable $attributes = [])
 * @method static QuizQuestion[]|Proxy[]             createSequence(iterable|callable $sequence)
 * @method static QuizQuestion[]|Proxy[]             findBy(array $attributes)
 * @method static QuizQuestion[]|Proxy[]             randomRange(int $min, int $max, array $attributes = [])
 * @method static QuizQuestion[]|Proxy[]             randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<QuizQuestion> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<QuizQuestion> createOne(array $attributes = [])
 * @phpstan-method static Proxy<QuizQuestion> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<QuizQuestion> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<QuizQuestion> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<QuizQuestion> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<QuizQuestion> random(array $attributes = [])
 * @phpstan-method static Proxy<QuizQuestion> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<QuizQuestion> repository()
 * @phpstan-method static list<Proxy<QuizQuestion>> all()
 * @phpstan-method static list<Proxy<QuizQuestion>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<QuizQuestion>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<QuizQuestion>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<QuizQuestion>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<QuizQuestion>> randomSet(int $number, array $attributes = [])
 */
final class QuizQuestionFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'position' => self::faker()->numberBetween(1, 32767),
            'question' => self::faker()->text(255),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(QuizQuestion $quizQuestion): void {})
    }

    protected static function getClass(): string
    {
        return QuizQuestion::class;
    }
}
