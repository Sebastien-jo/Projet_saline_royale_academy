<?php

namespace App\Factory;

use App\Entity\OptionQuizQuestion;
use App\Repository\OptionQuizQuestionRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<OptionQuizQuestion>
 *
 * @method        OptionQuizQuestion|Proxy                     create(array|callable $attributes = [])
 * @method static OptionQuizQuestion|Proxy                     createOne(array $attributes = [])
 * @method static OptionQuizQuestion|Proxy                     find(object|array|mixed $criteria)
 * @method static OptionQuizQuestion|Proxy                     findOrCreate(array $attributes)
 * @method static OptionQuizQuestion|Proxy                     first(string $sortedField = 'id')
 * @method static OptionQuizQuestion|Proxy                     last(string $sortedField = 'id')
 * @method static OptionQuizQuestion|Proxy                     random(array $attributes = [])
 * @method static OptionQuizQuestion|Proxy                     randomOrCreate(array $attributes = [])
 * @method static OptionQuizQuestionRepository|RepositoryProxy repository()
 * @method static OptionQuizQuestion[]|Proxy[]                 all()
 * @method static OptionQuizQuestion[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static OptionQuizQuestion[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static OptionQuizQuestion[]|Proxy[]                 findBy(array $attributes)
 * @method static OptionQuizQuestion[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static OptionQuizQuestion[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<OptionQuizQuestion> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<OptionQuizQuestion> createOne(array $attributes = [])
 * @phpstan-method static Proxy<OptionQuizQuestion> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<OptionQuizQuestion> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<OptionQuizQuestion> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<OptionQuizQuestion> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<OptionQuizQuestion> random(array $attributes = [])
 * @phpstan-method static Proxy<OptionQuizQuestion> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<OptionQuizQuestion> repository()
 * @phpstan-method static list<Proxy<OptionQuizQuestion>> all()
 * @phpstan-method static list<Proxy<OptionQuizQuestion>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<OptionQuizQuestion>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<OptionQuizQuestion>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<OptionQuizQuestion>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<OptionQuizQuestion>> randomSet(int $number, array $attributes = [])
 */
final class OptionQuizQuestionFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'content' => self::faker()->text(255),
            'isValid' => self::faker()->boolean(),
            'question' => QuizQuestionFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(OptionQuizQuestion $optionQuizQuestion): void {})
    }

    protected static function getClass(): string
    {
        return OptionQuizQuestion::class;
    }
}
