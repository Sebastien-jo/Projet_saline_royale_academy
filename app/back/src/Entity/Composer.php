<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ComposerRepository;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: ComposerRepository::class)]
#[ApiResource]
#[uniqueEntity(
    fields: ['name', 'completeName'],
    message: 'Name already use',
    groups: ['import', 'Default']
)]
class Composer extends AbstractEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $completeName = null;

    #[ORM\Column(length: 255)]
    private ?string $portrait = null;

    #[ORM\Column(type: 'date')]
    private DateTimeInterface $birth;

    #[ORM\Column(type: 'date')]
    private DateTimeInterface $death;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCompleteName(): ?string
    {
        return $this->completeName;
    }

    public function setCompleteName(string $completeName): self
    {
        $this->completeName = $completeName;

        return $this;
    }

    public function getPortrait(): ?string
    {
        return $this->portrait;
    }

    public function setPortrait(?string $portrait): void
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
}
