<?php

namespace App\Entity\Favorites;

use App\Entity\Composer;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
class FavoritesComposer extends Favorites
{
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Composer $composer = null;

    public function getType(): string
    {
        return 'composer';
    }

    public function getComposer(): ?Composer
    {
        return $this->composer;
    }

    public function setComposer(?Composer $composer): static
    {
        $this->composer = $composer;

        return $this;
    }
}
