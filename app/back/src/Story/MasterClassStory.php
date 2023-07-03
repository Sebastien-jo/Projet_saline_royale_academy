<?php

namespace App\Story;

use App\Factory\LessonArticleFactory;
use App\Factory\LessonVideoFactory;
use App\Factory\MasterclassFactory;
use App\Factory\SectionFactory;
use App\Factory\UserFactory;
use App\Factory\WorkFactory;
use Zenstruck\Foundry\Story;

final class MasterClassStory extends Story
{
    public function build(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $teacher = UserFactory::new(['roles' => ['TEACHER']]);

            MasterclassFactory::createMany(5, fn () => [
                'work' => WorkFactory::random(),
                'teacher' => $teacher,
            ]);
            SectionFactory::createMany(20, fn () => [
                'masterclass' => MasterclassFactory::random(),
            ]);

            for ($i = 0; $i < 4; $i++) {
                $section = SectionFactory::random();
                LessonArticleFactory::createMany(5, fn () => [
                    'section' => $section,
                ]);
                LessonVideoFactory::createMany(5, fn () => [
                    'section' => $section,
                ]);
            }
        }

        // TODO build your story here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#stories)
    }
}
