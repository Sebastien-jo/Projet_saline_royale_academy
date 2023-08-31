<?php

namespace App\Enum;

enum Instrument: string
{
    case PIANO = 'Piano';
    case VIOLIN = 'Violin';
    case GUITAR = 'Guitar';
    case DOUBLE_BASS = 'Double bass';
    case HARP = 'Harp';
    case CELLO = 'Cello';
    case VIOLA = 'Viola';
    case FLUTE = 'flute';
    case PICCOLO = 'Piccolo';
    case OBOE = 'Oboe';
    case ENGLISH_HORN = 'English Horn';
    case CLARINET = 'Clarinet';
    case BASS_CLARINET = 'Bass clarinet';
    case BASSOON = 'Bassoon';
    case CONTRABASSOON = 'Contrabassoon';
    case TRUMPET = 'Trumpet';
    case FRENCH_HORN = 'French horn';
    case TROMBONE = 'Trombone';
    case TUBA = 'Tuba';
    case XYLOPHONE = 'Xylophone';
    case CYMBALS = 'Cymbals';
    case TRIANGLE = 'Triangle';
    case SNARE_DRUM = 'Snare drum';
    case BASS_DRUM = 'Bass drum';
    case TAMBOURINE = 'Tambourine';
    case MARACAS = 'Maracas';
    case GONG = 'Gong';
    case CHIMES = 'Chimes';
    case CASTANETS = 'Castanets';
    case CELESTA = 'Celesta';
    case ORCHESTRA_CONDUCTOR = 'Orchestra conductor';

    /**
     * @return array<int,mixed>
     */
    public static function getCases(): array
    {
        return self::cases();
    }
}
