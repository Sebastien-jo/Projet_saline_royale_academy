<?php

namespace App\Entity\Lesson;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Entity\AbstractEntity;
use App\Entity\Section;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\LessonRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LessonRepository::class)]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name: 'type', type: Types::STRING)]
#[ORM\DiscriminatorMap([
    'lesson' => Lesson::class,
    'lesson_exercise' => LessonExercise::class,
    'lesson_video' => LessonVideo::class,
    'lesson_article' => LessonArticle::class,
])]
#[ApiResource(operations: [new Get(name: 'api_lessons_get_item')])]
#[ORM\HasLifecycleCallbacks]
class Lesson extends AbstractEntity
{
    use TimestampableTrait;

    public const TYPE = 'lesson';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['masterclass_user:read', 'masterclass:write', 'masterclass_user:read:item', 'masterclass:read:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['masterclass_user:read', 'masterclass:write', 'masterclass:read:item'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['masterclass:write', 'masterclass:read:item'])]
    private ?string $resume = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['masterclass:write', 'masterclass:read:item'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::SMALLINT)]
    #[Groups(['masterclass_user:read', 'masterclass:write', 'masterclass:read:item'])]
    private ?int $position = null;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'lessons')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Section $section = null;

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

    public function getResume(): ?string
    {
        return $this->resume;
    }

    public function setResume(string $resume): self
    {
        $this->resume = $resume;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): self
    {
        $this->position = $position;

        return $this;
    }

    public function getSection(): ?Section
    {
        return $this->section;
    }

    public function setSection(?Section $section): self
    {
        $this->section = $section;

        return $this;
    }
}
