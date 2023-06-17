<?php

namespace App\Entity\Translation;

use App\Entity\Badge;
use App\Entity\Traits\IdentifiableTrait;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Locastic\ApiPlatformTranslationBundle\Model\AbstractTranslation;
use Locastic\ApiPlatformTranslationBundle\Model\TranslatableInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
class BadgeTranslation extends AbstractTranslation
{
    use IdentifiableTrait;

    #[ORM\ManyToOne(targetEntity: Badge::class, inversedBy: 'translations')]
    protected ?TranslatableInterface $translatable = null;

    #[Groups(['badge:post:write', 'translations'])]
    #[ORM\Column(type: 'string')]
    protected ?string $locale = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['badge:post:write', 'badge:read', 'translations'])]
    private string $name;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['badge:post:write', 'badge:read', 'translations'])]
    private string $description;

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }
}
