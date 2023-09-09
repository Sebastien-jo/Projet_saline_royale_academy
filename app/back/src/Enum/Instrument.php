<?php

namespace App\Enum;

enum Instrument: string
{
    case PIANO = 'Piano';
    case VIOLON = 'Violon';
    case VIOLONCELLE = 'Violoncelle';
    case ALTO = 'Alto';
    case FLUTE = 'Flute';
    case CLARINETTE = 'Clarinette';
    case TROMBONE = 'Trombone';
    case HAUT_BOIS = 'Haut-bois';
    case CHANT = 'Chant';
    case CHEF_ORCHESTRE = 'Chef orchestre';

    /**
     * @return array<int,mixed>
     */
    public static function getCases(): array
    {
        return self::cases();
    }
}
