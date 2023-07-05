<?php

namespace App\Factory;

use App\Entity\MasterclassUser;
use App\Repository\MasterclassUserRepository;
use DateTimeImmutable;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<MasterclassUser>
 *
 * @method        MasterclassUser|Proxy                     create(array|callable $attributes = [])
 * @method static MasterclassUser|Proxy                     createOne(array $attributes = [])
 * @method static MasterclassUser|Proxy                     find(object|array|mixed $criteria)
 * @method static MasterclassUser|Proxy                     findOrCreate(array $attributes)
 * @method static MasterclassUser|Proxy                     first(string $sortedField = 'id')
 * @method static MasterclassUser|Proxy                     last(string $sortedField = 'id')
 * @method static MasterclassUser|Proxy                     random(array $attributes = [])
 * @method static MasterclassUser|Proxy                     randomOrCreate(array $attributes = [])
 * @method static MasterclassUserRepository|RepositoryProxy repository()
 * @method static MasterclassUser[]|Proxy[]                 all()
 * @method static MasterclassUser[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static MasterclassUser[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static MasterclassUser[]|Proxy[]                 findBy(array $attributes)
 * @method static MasterclassUser[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static MasterclassUser[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 *
 * @phpstan-method        Proxy<MasterclassUser> create(array|callable $attributes = [])
 * @phpstan-method static Proxy<MasterclassUser> createOne(array $attributes = [])
 * @phpstan-method static Proxy<MasterclassUser> find(object|array|mixed $criteria)
 * @phpstan-method static Proxy<MasterclassUser> findOrCreate(array $attributes)
 * @phpstan-method static Proxy<MasterclassUser> first(string $sortedField = 'id')
 * @phpstan-method static Proxy<MasterclassUser> last(string $sortedField = 'id')
 * @phpstan-method static Proxy<MasterclassUser> random(array $attributes = [])
 * @phpstan-method static Proxy<MasterclassUser> randomOrCreate(array $attributes = [])
 * @phpstan-method static RepositoryProxy<MasterclassUser> repository()
 * @phpstan-method static list<Proxy<MasterclassUser>> all()
 * @phpstan-method static list<Proxy<MasterclassUser>> createMany(int $number, array|callable $attributes = [])
 * @phpstan-method static list<Proxy<MasterclassUser>> createSequence(iterable|callable $sequence)
 * @phpstan-method static list<Proxy<MasterclassUser>> findBy(array $attributes)
 * @phpstan-method static list<Proxy<MasterclassUser>> randomRange(int $min, int $max, array $attributes = [])
 * @phpstan-method static list<Proxy<MasterclassUser>> randomSet(int $number, array $attributes = [])
 */
final class MasterclassUserFactory extends ModelFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    protected function getDefaults(): array
    {
        return [
            'addedAt' => DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'masterclass' => MasterclassFactory::new(),
            'user' => UserFactory::new(),
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    protected function initialize(): self
    {
        return $this;
        // ->afterInstantiate(function(MasterclassUser $masterclassUser): void {})
    }

    protected static function getClass(): string
    {
        return MasterclassUser::class;
    }
}
