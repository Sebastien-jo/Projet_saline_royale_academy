<?php

namespace App\Entity\Traits;

trait HydratableTrait
{
    use ConvertKeyTrait;

    /**
     * @param array<mixed> $donnees
     * @param array<mixed> $hydrateException
     */
    public function hydrate(array $donnees, array $hydrateException = []): void
    {
        $donnees = $this->convertKey($donnees, $hydrateException);

        foreach ($donnees as $key => $value) {
            $method = 'set' . ucfirst((string) $key);
            // Si le setter correspondant existe.
            if (method_exists($this, $method)) {
                // On appelle le setter
                $this->$method($value);
            }
        }
    }
}
