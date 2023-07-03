<?php

namespace App\Story;

use App\Factory\BadgeFactory;
use App\Factory\Translation\BadgeTranslationFactory;
use Zenstruck\Foundry\Story;

final class BadgeStory extends Story
{
    public function __construct()
    {
    }

    public function build(): void
    {
        for ($i = 0; $i < 10; $i++) {
            $badge = BadgeFactory::new();

            for ($i = 0; $i < 5; $i++) {
                BadgeTranslationFactory::createMany(5, fn () => [
                    'translatable' => $badge,
                ]);
            }
        }
    }
}
