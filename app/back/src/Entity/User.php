<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Traits\TimestampableTrait;
use App\Enum\BadgeCategory;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Stringable;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/users/stats',
            routeName: 'api:user:stat',
            normalizationContext: ['groups' => ['user:read']],
            name: 'api:user:stat'
        ),
        new GetCollection(),
        new Post(
            denormalizationContext: ['groups' => ['user:create']],
            processor: UserPasswordHasher::class
        ),
        new Get(uriTemplate: '/users/{id}', requirements: ['id' => '\d+']),
        new Patch(denormalizationContext: ['groups' => ['user:update']], processor: UserPasswordHasher::class),
        new Delete(),
    ],
    inputFormats: ['multipart' => ['multipart/form-data']],
    normalizationContext: ['groups' => ['user:read']],
)]
#[Vich\Uploadable]
class User extends AbstractEntity implements UserInterface, PasswordAuthenticatedUserInterface, Stringable
{
    use TimestampableTrait;

    #[Groups(['user:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[ApiProperty(identifier: true)]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['user:create'])]
    private ?string $email = null;

    /**
     * @var array<string> $roles
     */
    #[ORM\Column(type: 'json')]
    private array $roles = [];

    #[ORM\Column]
    private string $password;

    //    #[Assert\NotBlank(groups: ['user:create'])]
    #[Groups(['user:create'])]
    private ?string $plainPassword = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:create', 'user:update', 'user:read'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:create', 'user:update', 'user:read'])]
    private ?string $firstName = null;

    #[ORM\ManyToMany(targetEntity: Badge::class, inversedBy: 'users')]
    #[Groups(['user:update'])]
    private Collection $badges;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: QuizResponse::class, orphanRemoval: true)]
    private Collection $quizResponses;

    #[Groups(['user:read'])]
    public ?string $contentUrl = null;

    #[Vich\UploadableField(mapping: 'avatar_object', fileNameProperty: 'avatarPath')]
    #[Groups(['user:create'])]
    public ?File $avatar = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:read'])]
    public ?string $avatarPath = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: MasterclassUser::class, orphanRemoval: true)]
    private Collection $masterclassUsers;

    #[ORM\OneToMany(mappedBy: 'teacher', targetEntity: Masterclass::class, orphanRemoval: true)]
    private Collection $masterclass;

    public function __construct()
    {
        parent::__construct();
        $this->badges = new ArrayCollection();
        $this->quizResponses = new ArrayCollection();
        $this->masterclass = new ArrayCollection();
        $this->masterclassUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param array<string> $roles
     *
     * @return $this
     */
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * @return Collection<int, Badge>
     */
    public function getBadges(): Collection
    {
        return $this->badges;
    }

    public function addBadge(Badge $badge): self
    {
        if (!$this->badges->contains($badge)) {
            $this->badges->add($badge);
        }

        return $this;
    }

    public function removeBadge(Badge $badge): self
    {
        $this->badges->removeElement($badge);

        return $this;
    }

    /**
     * @return Collection<int, QuizResponse>
     */
    public function getQuizResponses(): Collection
    {
        return $this->quizResponses;
    }

    public function addQuizResponse(QuizResponse $quizResponse): self
    {
        if (!$this->quizResponses->contains($quizResponse)) {
            $this->quizResponses->add($quizResponse);
            $quizResponse->setUser($this);
        }

        return $this;
    }

    public function removeQuizResponse(QuizResponse $quizResponse): self
    {
        // set the owning side to null (unless already changed)
        if ($this->quizResponses->removeElement($quizResponse) && $quizResponse->getUser() === $this) {
            $quizResponse->setUser(null);
        }

        return $this;
    }

    public function getAvatarPath(): ?string
    {
        return $this->avatarPath;
    }

    public function setAvatarPath(?string $avatarPath): self
    {
        $this->avatarPath = $avatarPath;

        return $this;
    }

    public function getAvatar(): ?File
    {
        return $this->avatar;
    }

    public function setAvatar(?File $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * @return Collection<int, MasterclassUser>
     */
    public function getMasterclassUsers(): Collection
    {
        return $this->masterclassUsers;
    }

    public function addMasterclassUsers(MasterclassUser $masterclassUsers): static
    {
        if (!$this->masterclassUsers->contains($masterclassUsers)) {
            $this->masterclassUsers->add($masterclassUsers);
            $masterclassUsers->setUser($this);
        }

        return $this;
    }

    public function removeMasterclassUsers(MasterclassUser $masterclassUsers): static
    {
        // set the owning side to null (unless already changed)
        if ($this->masterclassUsers->removeElement($masterclassUsers) && $masterclassUsers->getUser() === $this) {
            $masterclassUsers->setUser(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, Masterclass>
     */
    public function getMasterclass(): Collection
    {
        return $this->masterclass;
    }

    public function addMasterclass(Masterclass $masterclass): static
    {
        if (!$this->masterclass->contains($masterclass)) {
            $this->masterclass->add($masterclass);
            $masterclass->setTeacher($this);
        }

        return $this;
    }

    public function removeMasterclass(Masterclass $masterclass): static
    {
        // set the owning side to null (unless already changed)
        if ($this->masterclass->removeElement($masterclass) && $masterclass->getTeacher() === $this) {
            $masterclass->setTeacher(null);
        }

        return $this;
    }

    public function __toString(): string
    {
        return $this->firstName . ' ' . $this->lastName;
    }

    /**
     * @return array<string, int>
     */
    #[Groups(['user:stats'])]
    public function getStats(): array
    {
        return [
            'nbQuiz' => $this->quizResponses->count(),
            'nbMasterclass' => $this->masterclassUsers->count(),
            'nbBadge' => $this->badges->count(),
            'nbInstrument' => $this->badges->filter(fn (
                Badge $badge
            ) => $badge->getCategory() === BadgeCategory::Instrument)->count(),
        ];
    }
}
