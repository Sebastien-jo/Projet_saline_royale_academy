<?php

namespace App\Enum;

enum BadgeCategory: string
{
    case Instrument = 'Instrument';
    case Partition = 'Partition';
    case Play = 'play';
    case Music = 'Music';
}
