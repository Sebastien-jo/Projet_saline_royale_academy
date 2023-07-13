<?php

namespace App\Entity\Favorites;

use App\Entity\Masterclass;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
class FavoritesMasterclass extends Favorites
{
    #[ORM\ManyToOne(inversedBy: 'favoritesMasterclasses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Masterclass $masterclass = null;

    public function getType(): string
    {
        return 'masterclass';
    }

    public function getMasterclass(): ?Masterclass
    {
        return $this->masterclass;
    }

    public function setMasterclass(?Masterclass $masterclass): static
    {
        $this->masterclass = $masterclass;

        return $this;
    }
}
