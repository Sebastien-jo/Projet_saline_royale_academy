<?php

namespace App\Entity\Favorites;

use App\Entity\Work;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
class FavoritesWork extends Favorites
{
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Work $work = null;

    public function getType(): string
    {
        return 'work';
    }

    public function getWork(): ?Work
    {
        return $this->work;
    }

    public function setWork(?Work $work): static
    {
        $this->work = $work;

        return $this;
    }
}
