<?php

namespace App\Command\Interface;

interface ComposerFetcherInterface
{
    /**
     * @return array<mixed>
     */
    public function fetchData(): array;
}
