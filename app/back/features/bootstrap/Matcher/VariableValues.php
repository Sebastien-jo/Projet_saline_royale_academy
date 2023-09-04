<?php

namespace Hetic\Behat\Matcher;

use InvalidArgumentException;

use function in_array;

/**
 * Check a value against given ones.
 */
class VariableValues
{
    public function __invoke(mixed $variable, mixed $values): void
    {
        if (!is_scalar($variable)) {
            throw new InvalidArgumentException(sprintf("The value '%s' cannot be checked as it's not scalar.", $variable));
        }

        if (!in_array($variable, explode('|', (string) $values), false)) {
            throw new InvalidArgumentException(sprintf('The input value "%s" is not one of the expected values: %s', $variable, $values));
        }
    }
}
