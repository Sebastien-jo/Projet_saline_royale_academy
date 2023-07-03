<?php

namespace App\Entity\Traits;

trait ConvertKeyTrait
{
    /**
     * @param array<mixed> $donnees
     * @param array<mixed> $hydrateException
     *
     * @return array<mixed>
     */
    public function convertKey(array $donnees, array $hydrateException = []): array
    {
        $newArray = [];
        foreach ($donnees as $key => $value) {
            if (array_key_exists($key, $hydrateException)) {
                $newArray[$hydrateException[$key]] = $value;
            } else {
                $newArray[$key] = $value;
            }
        }

        return $newArray;
    }
}
