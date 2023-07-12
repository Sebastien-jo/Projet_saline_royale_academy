<?php

namespace App\Entity;

use App\Repository\SectionUserRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SectionUserRepository::class)]
class SectionUser
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'sectionUsers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Section $section = null;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $validatedAt = null;

    #[ORM\OneToMany(mappedBy: 'sectionUser', targetEntity: LessonUser::class, orphanRemoval: true)]
    private Collection $lessonUsers;

    #[ORM\ManyToOne(inversedBy: 'sectionUsers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?MasterclassUser $masterclassUser = null;

    public function __construct()
    {
        $this->lessonUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSection(): ?Section
    {
        return $this->section;
    }

    public function setSection(?Section $section): static
    {
        $this->section = $section;

        return $this;
    }

    public function getValidatedAt(): ?DateTimeImmutable
    {
        return $this->validatedAt;
    }

    public function setValidatedAt(?DateTimeImmutable $validatedAt): static
    {
        $this->validatedAt = $validatedAt;

        return $this;
    }

    /**
     * @return Collection<int, LessonUser>
     */
    public function getLessonUsers(): Collection
    {
        return $this->lessonUsers;
    }

    public function addLessonUser(LessonUser $lessonUser): static
    {
        if (!$this->lessonUsers->contains($lessonUser)) {
            $this->lessonUsers->add($lessonUser);
            $lessonUser->setSectionUser($this);
        }

        return $this;
    }

    public function removeLessonUser(LessonUser $lessonUser): static
    {
        // set the owning side to null (unless already changed)
        if ($this->lessonUsers->removeElement($lessonUser) && $lessonUser->getSectionUser() === $this) {
            $lessonUser->setSectionUser(null);
        }

        return $this;
    }

    public function getMasterclassUser(): ?MasterclassUser
    {
        return $this->masterclassUser;
    }

    public function setMasterclassUser(?MasterclassUser $masterclassUser): static
    {
        $this->masterclassUser = $masterclassUser;

        return $this;
    }
}
