<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\MasterclassUserRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MasterclassUserRepository::class)]
#[ApiResource]
#[ORM\HasLifecycleCallbacks]
class MasterclassUser
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Masterclass $masterclass = null;

    #[ORM\ManyToOne(inversedBy: 'masterclassUsers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'masterclassUser', targetEntity: SectionUser::class, orphanRemoval: true)]
    private Collection $sectionUsers;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $validatedAt = null;

    public function __construct()
    {
        $this->sectionUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

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
            $sectionUser->setMasterclassUser($this);
        }

        return $this;
    }

    public function removeSectionUser(SectionUser $sectionUser): static
    {
        // set the owning side to null (unless already changed)
        if ($this->sectionUsers->removeElement($sectionUser) && $sectionUser->getMasterclassUser() === $this) {
            $sectionUser->setMasterclassUser(null);
        }

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
}
