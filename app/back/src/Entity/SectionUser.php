<?php

namespace App\Entity;

use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\SectionUserRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\HasLifecycleCallbacks]
#[ORM\Entity(repositoryClass: SectionUserRepository::class)]
class SectionUser extends AbstractEntity
{
    use IdentifiableTrait;
    use SoftDeleteableEntity;
    use TimestampableTrait;

    #[ORM\ManyToOne(inversedBy: 'sectionUsers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['masterclass_user:read'])]
    private ?Section $section = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['masterclass_user:read'])]
    private ?DateTimeImmutable $validatedAt = null;

    #[ORM\OneToMany(mappedBy: 'sectionUser', targetEntity: LessonUser::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['masterclass_user:read'])]
    private Collection $lessonUsers;

    #[ORM\ManyToOne(inversedBy: 'sectionUsers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?MasterclassUser $masterclassUser = null;

    public function __construct(array $array = [])
    {
        parent::__construct($array);
        $this->lessonUsers = new ArrayCollection();
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
