<?php

namespace App\Entity;

class AbstractEntity
{
    /**
     * @param array<string>|null $array
     */
    public function __construct(?array $array)
    {
        if ($array) {
            $this->hydrate($array);
        }
    }

    /**
     * @param array<string> $donnees
     */
    public function hydrate(array $donnees): void
    {
        foreach ($donnees as $key => $value) {
            // On récupère le nom du setter correspondant à l'attribut
            $method = 'set' . ucfirst($key);

            // Si le setter correspondant existe.
            if (method_exists($this, $method)) {
                // On appelle le setter
                $this->$method($value);
            }
        }
    }
}
