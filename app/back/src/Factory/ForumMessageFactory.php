<?php

namespace App\Factory;

use App\Entity\ForumMessage;
use App\Repository\ForumMessageRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<ForumMessage>
 *
 * @method        ForumMessage|Proxy                     create(array|callable $attributes = [])
 * @method static ForumMessage|Proxy                     createOne(array $attributes = [])
 * @method static ForumMessage|Proxy                     find(object|array|mixed $criteria)
 * @method static ForumMessage|Proxy                     findOrCreate(array $attributes)
 * @method static ForumMessage|Proxy                     first(string $sortedField = 'id')
 * @method static ForumMessage|Proxy                     last(string $sortedField = 'id')
 * @method static ForumMessage|Proxy                     random(array $attributes = [])
 * @method static ForumMessage|Proxy                     randomOrCreate(array $attributes = [])
 * @method static ForumMessageRepository|RepositoryProxy repository()
 * @method static ForumMessage[]|Proxy[]                 all()
 * @method static ForumMessage[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static ForumMessage[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static ForumMessage[]|Proxy[]                 findBy(array $attributes)
 * @method static ForumMessage[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static ForumMessage[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<ForumMessage> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<ForumMessage> createOne(array $attributes = [])
 * @phpstan-method static Proxy<ForumMessage> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<ForumMessage> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<ForumMessage> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<ForumMessage> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<ForumMessage> random(array $attributes = [])
 * @phpstan-method static Proxy<ForumMessage> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<ForumMessage> repository()
 * @phpstan-method static list<Proxy<ForumMessage>> all()
 * @phpstan-method static list<Proxy<ForumMessage>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<ForumMessage>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<ForumMessage>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<ForumMessage>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<ForumMessage>> randomSet(int $number, array $attributes = [])
 */
final class ForumMessageFactory extends ModelFactory
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
            'forum' => ForumFactory::random(),
            'user' => UserFactory::random(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
            // ->afterInstantiate(function(ForumMessage $forumMessage): void {})
    }

    protected static function getClass(): string
    {
        return ForumMessage::class;
    }
}
