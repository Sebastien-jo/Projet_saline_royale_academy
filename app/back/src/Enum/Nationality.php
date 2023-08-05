<?php

namespace App\Enum;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Operation;

#[GetCollection(provider: Nationality::class . '::getCases')]
#[Get(provider: Nationality::class . '::getCase')]
#[ApiResource]
enum Nationality: string
{
    case Null = '';
    case Fr = 'Française';
    case En = 'English';
    case Es = 'Español';
    case De = 'Deutsch';
    case It = 'Italiano';
    case Pt = 'Português';
    case Nl = 'Nederlands';
    case Pl = 'Polski';
    case Ru = 'Русский';
    case Cn = '中文';
    case Ar = 'العربية';
    case Ja = '日本語';
    case Ko = '한국어';
    case Tr = 'Türkçe';
    case Th = 'ไทย';
    case Vi = 'Tiếng Việt';
    case Id = 'Bahasa Indonesia';
    case Ro = 'Română';
    case Cs = 'Čeština';
    case Hu = 'Magyar';
    case Sv = 'Svenska';
    case Da = 'Dansk';
    case Fi = 'Suomi';
    case No = 'Norsk';
    case El = 'Ελληνικά';
    case He = 'עברית';
    case Hi = 'हिन्दी';
    case Bg = 'Български';
    case Uk = 'Українська';
    case Sk = 'Slovenčina';
    case Sl = 'Slovenščina';
    case Hr = 'Hrvatski';
    case Lt = 'Lietuvių';
    case Lv = 'Latviešu';
    case Et = 'Eesti';
    case Sr = 'Srpski';
    case Ms = 'Bahasa Melayu';
    case Fa = 'فارسی';
    case Sw = 'Kiswahili';
    case Af = 'Afrikaans';
    case Sq = 'Shqip';
    case Hy = 'Հայերեն';
    case Az = 'Azərbaycanca';
    case Be = 'Беларуская';
    case Bs = 'Bosanski';
    case Ka = 'ქართული';
    case Mk = 'Македонски';
    case Mn = 'Монгол';
    case Ne = 'नेपाली';
    case Ps = 'پښتو';
    case SrLatn = 'Srpski (latinica)';
    case SwLatn = 'Kiswahili (latinica)';
    case Ta = 'தமிழ்';
    case Te = 'తెలుగు';
    case ZhHans = '中文（简体）';
    case ZhHant = '中文（繁體）';
    case ZhHantTw = '中文（台灣）';
    case ZhHantHk = '中文（香港）';

    /**
     * @return array<int,mixed>
     */
    public static function getCases(): array
    {
        return self::cases();
    }

    /**
     * @param array<string,mixed> $uriVariables
     *
     * @return mixed
     */
    public static function getCase(Operation $operation, array $uriVariables)
    {
        $name = $uriVariables['id'] ?? null;

        return constant(self::class . "::$name");
    }
}
