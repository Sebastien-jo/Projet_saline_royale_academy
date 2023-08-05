<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Entity\Lesson\Lesson;
use App\Entity\Traits\IdentifiableTrait;
use App\Repository\SectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SectionRepository::class)]
#[ApiResource(operations: [new Get(name: 'api_sections_get_item')])]
class Section extends AbstractEntity
{
    use IdentifiableTrait;

    #[ORM\ManyToOne(inversedBy: 'sections')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Masterclass $masterclass = null;

    #[ORM\Column(length: 255)]
    #[Groups(['masterclass_user:read', 'masterclass:write'])]
    private ?string $name = null;

    #[Groups(['masterclass_user:read', 'masterclass:write'])]
    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $position = null;

    #[ORM\OneToMany(mappedBy: 'section', targetEntity: Lesson::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['masterclass:write'])]
    private Collection $lessons;

    #[Groups(['masterclass:write'])]
    /* @phpstan-ignore-next-line */
    private Collection $lessonsContent;

    #[ORM\OneToMany(mappedBy: 'section', targetEntity: SectionUser::class, orphanRemoval: true)]
    private Collection $sectionUsers;

    public function __construct()
    {
        parent::__construct();
        $this->lessons = new ArrayCollection();
        $this->sectionUsers = new ArrayCollection();
    }

    public function getMasterclass(): ?Masterclass
    {
        return $this->masterclass;
    }

    public function setMasterclass(?Masterclass $masterclass): self
    {
        $this->masterclass = $masterclass;

        return $this;
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

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): self
    {
        $this->position = $position;

        return $this;
    }

    /**
     * @return Collection<mixed>
     */
    public function getLessons(): Collection
    {
        return $this->lessons;
    }

    public function addLesson(Lesson $lesson): self
    {
        if (!$this->lessons->contains($lesson)) {
            $this->lessons->add($lesson);
            $lesson->setSection($this);
        }

        return $this;
    }

    public function removeLesson(Lesson $lesson): self
    {
        // set the owning side to null (unless already changed)
        if ($this->lessons->removeElement($lesson) && $lesson->getSection() === $this) {
            $lesson->setSection(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, SectionUser>
     */
    public function getSectionUsers(): Collection
    {
        return $this->sectionUsers;
    }

    public function addSectionUser(SectionUser $sectionUser): static
    {
        if (!$this->sectionUsers->contains($sectionUser)) {
            $this->sectionUsers->add($sectionUser);
            $sectionUser->setSection($this);
        }

        return $this;
    }

    public function removeSectionUser(SectionUser $sectionUser): static
    {
        // set the owning side to null (unless already changed)
        if ($this->sectionUsers->removeElement($sectionUser) && $sectionUser->getSection() === $this) {
            $sectionUser->setSection(null);
        }

        return $this;
    }
}
