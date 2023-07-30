<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\MasterclassUserRepository;
use App\State\MasterclassUserProvider;
use App\State\MasterclassUserStateProcessor;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MasterclassUserRepository::class)]
#[ApiResource(
    operations: [
        new Get(security: "is_granted('MASTERCLASS_USER_VIEW', object)"),
        new GetCollection(
            security: "is_granted('MASTERCLASS_USER_VIEW_LIST')",
            provider: MasterclassUserProvider::class
        ),
        new Post(
            uriTemplate: 'masterclass_users/add_masterclass/{masterclassId}',
            uriVariables: [
                'masterclassId' => new Link(
                    toProperty: 'user',
                    fromClass: MasterclassUser::class
                ),
            ],
            requirements: ['masterclassId' => '\d+'],
            security: "is_granted('MASTERCLASS_USER_CREATE', object)",
            processor: MasterclassUserStateProcessor::class
        ),
        //                processor: MasterclassUserStateProcessor::class),
        //        new Delete(security: "is_granted('MASTERCLASS_USER_DELETE', object)"),
        //        new Patch(securityPostDenormalize: "is_granted('MASTERCLASS_USER_DELETE', [object, previous_object])"),
    ],
    normalizationContext: ['groups' => ['masterclass_user:read', 'id']],
    denormalizationContext: ['groups' => ['masterclass_user:write']]
)]
#[ORM\HasLifecycleCallbacks]
class MasterclassUser extends AbstractEntity
{
    use TimestampableTrait;
    use SoftDeleteableEntity;
    use IdentifiableTrait;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Masterclass $masterclass = null;

    #[ORM\ManyToOne(inversedBy: 'masterclassUsers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['masterclass_user:read'])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'masterclassUser', targetEntity: SectionUser::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['masterclass_user:read'])]
    private Collection $sectionUsers;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $validatedAt = null;

    public function __construct(array $array = [])
    {
        parent::__construct($array);
        $this->sectionUsers = new ArrayCollection();
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
