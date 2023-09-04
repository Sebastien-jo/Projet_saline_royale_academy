<?php

namespace Hetic\Behat\Matcher;

use InvalidArgumentException;

/**
 * Check a value is a string, and is not empty
 */
class NotEmptyString
{
    public function __invoke(mixed $value): void
    {
        if (!is_string($value)) {
            throw new InvalidArgumentException(sprintf('Expected the value to be a string, got: %s.', gettype($value)));
        }

        if ('' === $value) {
            throw new InvalidArgumentException('Expected the value to be not empty');
        }
    }
}
