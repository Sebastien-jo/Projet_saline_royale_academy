<?php

namespace Hetic\Behat\Matcher;

use InvalidArgumentException;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Url;
use Symfony\Component\Validator\Validation;

/**
 * Check a value is a valid Url, not null and not blank.
 */
class ValidUrl
{
    public function __invoke(string $value): void
    {
        $validator = Validation::createValidator();
        $violations = $validator->validate($value, [new NotBlank(), new Url()]);

        if (0 !== count($violations)) {
            throw new InvalidArgumentException(sprintf('The value "%s" is not a valid Url string', $value));
        }
    }
}
