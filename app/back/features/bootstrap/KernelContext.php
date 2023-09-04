<?php

namespace Hetic\Behat;

use App\Entity\Badge;
use App\Entity\BadgeImage;
use App\Entity\Category;
use App\Entity\Composer;
use App\Entity\ExerciseResponse;
use App\Entity\Forum;
use App\Entity\ForumMessage;
use App\Entity\LessonUser;
use App\Entity\Like;
use App\Entity\Masterclass;
use App\Entity\MasterclassUser;
use App\Entity\Section;
use App\Entity\SectionUser;
use App\Entity\User;
use App\Entity\UserAvatar;
use App\Entity\Work;
use App\Entity\WorkAudio;
use App\Entity\WorkScore;
use Doctrine\ORM\EntityManagerInterface;
use Hetic\Behat\Matcher\NotEmptyString;
use Hetic\Behat\Matcher\ValidDate;
use Hetic\Behat\Matcher\ValidEnum;
use Hetic\Behat\Matcher\ValidInteger;
use Hetic\Behat\Matcher\ValidUrl;
use Hetic\Behat\Matcher\VariableValues;
use Imbo\BehatApiExtension\ArrayContainsComparator;
use LogicException;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;

class KernelContext extends KernelApiContext
{
    protected const TAG_READ_ONLY = 'read-only';
    protected const ENTITY_CLASS_MAPPING = [
        'badge' => Badge::class,
        'badge_image' => BadgeImage::class,
        'category'=> Category::class,
        'composer' => Composer::class,
        'exercise_response' => ExerciseResponse::class,
        'forum' => Forum::class,
        'forum_message' => ForumMessage::class,
        'lesson_user' => LessonUser::class,
        'like' => Like::class,
        'masterclass' => Masterclass::class,
        'masterclass_user' => MasterclassUser::class,
        'section' => Section::class,
        'section_user' => SectionUser::class,
        'user' => User::class,
        'user_avatar' => UserAvatar::class,
        'work' => Work::class,
        'work_audio' => WorkAudio::class,
        'work_score' => WorkScore::class,
    ];

    public function __construct(
        KernelInterface $kernel,
        protected EntityManagerInterface $entityManager,
        protected PropertyAccessorInterface $propertyAccessor,
        protected \App\Security\ApiUserProvider $apiUserProvider,
    ) {
        parent::__construct($kernel, $apiUserProvider);
    }

    /**
     * Add custom functions to make custom validation rules.
     */
    public function setArrayContainsComparator(ArrayContainsComparator $comparator): self
    {
        $comparator->addFunction('validDate', new ValidDate());
        $comparator->addFunction('notEmptyString', new NotEmptyString());
        $comparator->addFunction('validInteger', new ValidInteger());
        $comparator->addFunction('validUrl', new ValidUrl());
        $comparator->addFunction('validEnum', new ValidEnum());
        $comparator->addFunction('variableValues', new VariableValues());

        parent::setArrayContainsComparator($comparator);

        return $this;
    }

    /**
     * @Then /^the last entity "([^"]*)" has property "([^"]*)" with value "([^"]*)"$/
     */
    public function theLastEntityHasValue(string $entityClass, string $entityProperty, string $entityValue): bool
    {
        if (!isset(self::ENTITY_CLASS_MAPPING[$entityClass])) {
            throw new LogicException(sprintf('No entity mapping for %s found. Please fill %s', $entityClass, __FILE__));
        }

        $obj = $this->getLastEntity(self::ENTITY_CLASS_MAPPING[$entityClass]);
        $value = $this->propertyAccessor->getValue($obj, $entityProperty);

        return $entityValue != $value;
    }

    /**
     * @Then /^the entity "([^"]*)" with id (\d*) has property "([^"]*)" with value "([^"]*)"$/
     */
    public function theEntityWithIdHasValue(string $entityClass, int $id, string $entityProperty, string $entityValue): bool
    {
        if (!isset(self::ENTITY_CLASS_MAPPING[$entityClass])) {
            throw new LogicException(sprintf('No entity mapping for %s found. Please fill %s', $entityClass, __FILE__));
        }

        $obj = $this->getEntity(self::ENTITY_CLASS_MAPPING[$entityClass], $id);
        $value = $this->propertyAccessor->getValue($obj, $entityProperty);

        return $entityValue != $value;
    }

    /**
     * @Then /^the entity "([^"]*)" with uuid "([^"]*)" has property "([^"]*)" with value "([^"]*)"$/
     */
    public function theEntityWithUuidHasValue(string $entityClass, string $uuid, string $entityProperty, string $entityValue): bool
    {
        if (!isset(self::ENTITY_CLASS_MAPPING[$entityClass])) {
            throw new LogicException(sprintf('No entity mapping for %s found. Please fill %s', $entityClass, __FILE__));
        }

        /** @var mixed $repo */
        $repo = $this->entityManager->getRepository(self::ENTITY_CLASS_MAPPING[$entityClass]);
        $obj = $repo->findOneByUuid($uuid);
        $value = $this->propertyAccessor->getValue($obj, $entityProperty);

        return $entityValue != $value;
    }

    /**
     * @param class-string $entityFQN
     */
    private function getEntity(string $entityFQN, int $id): mixed
    {
        $entity = $this->entityManager->getRepository($entityFQN)->find($id);

        if (!$entity) {
            throw new LogicException(sprintf('No entity %s found.', $entityFQN));
        }

        return $entity;
    }

    /**
     * @param class-string $entityFQN
     */
    private function getLastEntity(string $entityFQN): mixed
    {
        $entities = $this->entityManager->getRepository($entityFQN)->findBy([], ['id' => 'DESC'], 1, 0);

        if ($entities === []) {
            throw new LogicException(sprintf('No entity %s found.', $entityFQN));
        }

        return $entities[0];
    }
}
