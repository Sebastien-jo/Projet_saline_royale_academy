<?php

namespace App\Entity;

use App\Entity\Traits\HydratableTrait;

abstract class AbstractEntity
{
    use HydratableTrait;

    /**
     * @param array<mixed> $array
     */
    public function __construct(array $array = [])
    {
        if ($array !== []) {
            $this->hydrate($array);
        }
    }
}
