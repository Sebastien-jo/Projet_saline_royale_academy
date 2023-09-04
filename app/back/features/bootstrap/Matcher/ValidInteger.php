<?php

namespace Hetic\Behat\Matcher;

use InvalidArgumentException;

/**
 * Check if value is a valid UUID
 */
class ValidInteger
{
    public function __invoke(mixed $value): void
    {
        if (!is_int($value)) {
            throw new InvalidArgumentException(sprintf('Expected the value to be an integer, got: %s.', gettype($value)));
        }
    }
}
