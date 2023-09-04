<?php

namespace Hetic\Behat\Matcher;

use DateTimeInterface;
use InvalidArgumentException;
use Symfony\Component\Validator\Constraints\DateTime as DateTimeConstraint;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validation;

class ValidDate
{
    public function __invoke(mixed $value, mixed $conditionalExpression): void
    {
        $validator = Validation::createValidator();
        $dateTimeConstraint = new DateTimeConstraint();
        $dateTimeConstraint->format = DateTimeInterface::ATOM;
        $constraintViolationList = $validator->validate($value, $dateTimeConstraint);

        /* @var ConstraintViolation $violation */
        if (count($constraintViolationList) > 0) {
            /* @phpstan-ignore-next-line */
            throw new InvalidArgumentException($constraintViolationList[0]->getMessage());
        }
    }
}
