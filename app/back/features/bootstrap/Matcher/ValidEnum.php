<?php

namespace Hetic\Behat\Matcher;

use Exception;
use InvalidArgumentException;

class ValidEnum
{
    public function __invoke(mixed $variable, mixed $values): void
    {
        try {
            $enum = $values::values();
        } catch (Exception) {
            throw new InvalidArgumentException(sprintf('The enum "%s" is not a valid enum or instance of MyCLabs\Enum\Enum', $variable));
        }

        if (!is_array($enum) || !in_array($variable, $enum)) {
            throw new InvalidArgumentException(sprintf('The value "%s" is not does not exist in enum', $values));
        }
    }
}
