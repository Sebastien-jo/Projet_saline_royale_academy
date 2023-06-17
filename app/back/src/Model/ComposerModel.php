<?php

namespace App\Model;

use App\Entity\Traits\HydratableTrait;
use App\Interface\ComposerModelInterface;
use DateTimeInterface;

class ComposerModel implements ComposerModelInterface
{
    use HydratableTrait;

    final public const openpusHydrateException = [
        'complete_name' => 'completeName',
        'id' => 'idApi',
    ];

    final public const hydrateException = self::openpusHydrateException;

    private string $name;

    private string $completeName;

    private string $portrait;

    private DateTimeInterface $birth;

    private DateTimeInterface $death;

    /**
     * @param array<mixed> $array
     * @param array<mixed> $hydrateException
     */
    public function __construct(array $array = [], array $hydrateException = self::hydrateException)
    {
        $this->hydrate($array, $hydrateException);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCompleteName(): string
    {
        return $this->completeName;
    }

    public function setCompleteName(string $completeName): self
    {
        $this->completeName = $completeName;

        return $this;
    }

    public function getPortrait(): string
    {
        return $this->portrait;
    }

    public function setPortrait(string $portrait): void
    {
        $this->portrait = $portrait;
    }

    public function getBirth(): DateTimeInterface
    {
        return $this->birth;
    }

    public function setBirth(DateTimeInterface $birth): void
    {
        $this->birth = $birth;
    }

    public function getDeath(): DateTimeInterface
    {
        return $this->death;
    }

    public function setDeath(DateTimeInterface $death): void
    {
        $this->death = $death;
    }

    /**
     * @return array<mixed>
     */
    public function toArray(): array
    {
        return [
            'name' => $this->getName(),
            'completeName' => $this->getCompleteName(),
            'portrait' => $this->getPortrait(),
            'birth' => $this->getBirth(),
            'death' => $this->getDeath(),
        ];
    }
}
