<?php

namespace App\Entity;

use App\Entity\Traits\HydratableTrait;
use Locastic\ApiPlatformTranslationBundle\Model\AbstractTranslatable;
use Locastic\ApiPlatformTranslationBundle\Model\TranslationInterface;
use RuntimeException;

class AbstractEntityTranslator extends AbstractTranslatable
{
    use HydratableTrait;

    /**
     * @param array<mixed> $array
     */
    public function __construct(array $array = [])
    {
        parent::__construct();
        if ($array !== []) {
            $this->hydrate($array);
        }
    }

    protected function createTranslation(): TranslationInterface
    {
        // get the class name of the entity
        $className = static::class;
        $className = substr($className, strrpos($className, '\\') + 1);
        $translationClass = "App\\Entity\\Translation\\$className" . 'Translation';
        // Vérifier si la classe de traduction existe
        if (!class_exists($translationClass)) {
            throw new RuntimeException("La classe de traduction '{$translationClass}' n'existe pas.");
        }

        /**
         * @var TranslationInterface $class
         */
        $class = new $translationClass();

        return $class;
    }
}
