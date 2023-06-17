<?php

namespace App\Interface;

use DateTimeInterface;

interface ComposerModelInterface
{
    /**
     * @return array<string>
     */
    public function toArray(): array;

    public function getName(): string;

    public function getCompleteName(): string;

    public function getPortrait(): string;

    public function getBirth(): DateTimeInterface;

    public function getDeath(): DateTimeInterface;
}
