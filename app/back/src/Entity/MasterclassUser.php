<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\MasterclassUserRepository;
use App\State\MasterclassUserStateProcessor;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MasterclassUserRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            normalizationContext: ['groups' => ['masterclass_user:read:item', 'id']],
            security: "is_granted('MASTERCLASS_USER_VIEW', object)",
            name: 'get_masterclass_user'
        ),
        new GetCollection(
            normalizationContext: ['groups' => ['masterclass_user:read', 'id']],
            security: "is_granted('MASTERCLASS_USER_VIEW_LIST')",
            name: 'SELF'
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
            security: "is_granted('MASTERCLASS_USER_CREATE')",
            processor: MasterclassUserStateProcessor::class
        ),
        new Delete(
            security: "is_granted('MASTERCLASS_USER_DELETE', object)",
            processor: MasterclassUserStateProcessor::class
        ),
    ],
    normalizationContext: ['groups' => ['masterclass_user:read', 'timestamp']],
    denormalizationContext: ['groups' => ['masterclass_user:write']]
)]
#[ORM\HasLifecycleCallbacks]
#[UniqueEntity(fields: [
    'user', 'masterclass',
], message: 'masterclass_user.already_add', errorPath: MasterclassUser::class)]
#[ApiResource]
class MasterclassUser extends AbstractEntity
{
    use TimestampableTrait;
    use SoftDeleteableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[ApiProperty(readableLink: false)]
    #[Groups(['masterclass_user:read', 'masterclass_user:read:item'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['masterclass_user:read', 'masterclass_user:read:item'])]
    private ?Masterclass $masterclass = null;

    #[ORM\ManyToOne(inversedBy: 'masterclassUsers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['masterclass_user:read:item, admin:read'])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'masterclassUser', targetEntity: SectionUser::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(['masterclass_user:read:item'])]
    private Collection $sectionUsers;

    #[ORM\Column(nullable: true)]
    #[Groups(['masterclass_user:read:item'])]
    private ?DateTimeImmutable $validatedAt = null;

    public function __construct(array $array = [])
    {
        parent::__construct($array);
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
