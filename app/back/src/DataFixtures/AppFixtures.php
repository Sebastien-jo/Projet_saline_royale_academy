<?php

namespace App\DataFixtures;

use App\Enum\Instrument;
use App\Factory\CategoryFactory;
use App\Factory\ComposerFactory;
use App\Factory\ForumFactory;
use App\Factory\ForumMessageFactory;
use App\Factory\UserFactory;
use App\Factory\WorkFactory;
use App\Story\MasterClassStory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createMany(2);
        UserFactory::createOne([
            'firstName' => 'user',
            'lastName' => 'user',
            'roles' => ['STUDENT'],
            'email' => 'user@gmail.com',
            'password' => 'user',
        ]);
        UserFactory::createOne([
            'firstName' => 'admin',
            'lastName' => 'admin',
            'roles' => ['ROLE_ADMIN'],
            'email' => 'admin@gmail.com',
            'password' => 'admin',
        ]);
        UserFactory::createOne([
            'firstName' => 'teacher',
            'lastName' => 'test',
            'roles' => ['ROLE_TEACHER'],
            'email' => 'teacher@gmail.com',
            'password' => 'password',
        ]);

        foreach (Instrument::cases() as $instrument) {
            CategoryFactory::createOne([
                'name' => $instrument->value,
            ]);
        }

        ForumFactory::createMany(10);
        ForumMessageFactory::createMany(10);

        ComposerFactory::createMany(50, [
            'categories' => CategoryFactory::randomRange(1, 5),
        ]);
        WorkFactory::createMany(30);

        MasterClassStory::load();
    }
}
