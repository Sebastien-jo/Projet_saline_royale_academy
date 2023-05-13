<?php

namespace App\DataFixtures;

use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createMany(10);
        UserFactory::createOne([
            'firstName' => 'user',
            'lastName' => 'user',
            'roles' => ['STUDENT'],
            'email' => 'user@gmail.com',
            'password' => 'user'
            ]);
        UserFactory::createOne([
            'firstName' => 'admin',
            'lastName' => 'admin',
            'roles' => ['TEACHER'],
            'email' => 'admin@gmail.com',
            'password' => 'admin'
            ]);

    }
}
