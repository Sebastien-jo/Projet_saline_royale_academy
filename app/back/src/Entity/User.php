<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Favorites\Favorites;
use App\Entity\Traits\IdentifiableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Enum\BadgeCategory;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[Gedmo\SoftDeleteable(fieldName: 'deletedAt', hardDelete: false)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new Get(security: 'is_granted("USER_PROFILE_VIEW", object)'),
        new Get(
            uriTemplate: '/api/users/{id}/stats',
            routeName: 'api:user:stat',
            normalizationContext: ['groups' => ['user:stats']],
            security: 'is_granted("USER_PROFILE_VIEW_STATS", object)',
            name: 'api:user:stat'
        ),
        new GetCollection(
            security: 'is_granted("USER_PROFILE_VIEW_LIST")'
        ),
        new Post(
            denormalizationContext: ['groups' => ['user:create']],
            validationContext: ['groups' => ['user:create']],
            processor: UserPasswordHasher::class
        ),
        new Patch(
            denormalizationContext: ['groups' => ['user:update']],
            security: 'is_granted("USER_PROFILE_EDIT", object)',
            name: 'update_user',
            processor: UserPasswordHasher::class
        ),
        new Delete(
            security: 'is_granted("USER_PROFILE_DELETE", object)'
        ),
    ],
    normalizationContext: ['groups' => ['user:read', 'timestamp', 'id']],
    denormalizationContext: ['groups' => ['user:create']],
)]
class User extends AbstractEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    use TimestampableTrait;
    use SoftDeleteableEntity;
    use IdentifiableTrait;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['user:create', 'user:read'])]
    #[Assert\NotBlank(allowNull: false, groups: ['user:create'])]
    #[Assert\Email(groups: ['user:create'])]
    private ?string $email = null;

    /**
     * @var array<string> $roles
     */
    #[ORM\Column(type: 'json')]
    #[Groups(['user:read', 'admin:write'])]
    private array $roles = [];

    #[ORM\Column]
    private string $password;

    #[Assert\NotBlank(allowNull: false, groups: ['user:create'])]
    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:create', 'user:update', 'user:read', 'forum:message:read'])]
    #[Assert\NotBlank(allowNull: false, groups: ['user:create'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:create', 'user:update', 'user:read', 'forum:message:read'])]
    #[Assert\NotBlank(allowNull: false, groups: ['user:create'])]
    private ?string $firstName = null;

    #[ORM\ManyToMany(targetEntity: Badge::class, inversedBy: 'users')]
    private Collection $badges;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: ExerciseResponse::class, orphanRemoval: true)]
    private Collection $quizResponses;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: MasterclassUser::class, orphanRemoval: true)]
    private Collection $masterclassUsers;

    #[ORM\OneToMany(mappedBy: 'teacher', targetEntity: Masterclass::class, orphanRemoval: true)]
    private Collection $masterclasses;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist'])]
    #[Groups(['user:read'])]
    private ?UserAvatar $userAvatar = null;

    #[ORM\ManyToOne]
    private ?Category $instrument = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Favorites::class, orphanRemoval: true)]
    private Collection $favorites;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Like::class)]
    private Collection $likes;

    public function __construct()
    {
        parent::__construct();
        $this->badges = new ArrayCollection();
        $this->quizResponses = new ArrayCollection();
        $this->masterclasses = new ArrayCollection();
        $this->masterclassUsers = new ArrayCollection();
        $this->favorites = new ArrayCollection();
        $this->likes = new ArrayCollection();
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
     * @return Collection<int, ExerciseResponse>
     */
    public function getQuizResponses(): Collection
    {
        return $this->quizResponses;
    }

    public function addQuizResponse(ExerciseResponse $quizResponse): self
    {
        if (!$this->quizResponses->contains($quizResponse)) {
            $this->quizResponses->add($quizResponse);
            $quizResponse->setUser($this);
        }

        return $this;
    }

    public function removeQuizResponse(ExerciseResponse $quizResponse): self
    {
        // set the owning side to null (unless already changed)
        if ($this->quizResponses->removeElement($quizResponse) && $quizResponse->getUser() === $this) {
            $quizResponse->setUser(null);
        }

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
    public function getMasterclasses(): Collection
    {
        return $this->masterclasses;
    }

    public function addMasterclass(Masterclass $masterclass): static
    {
        if (!$this->masterclasses->contains($masterclass)) {
            $this->masterclasses->add($masterclass);
            $masterclass->setTeacher($this);
        }

        return $this;
    }

    public function removeMasterclass(Masterclass $masterclass): static
    {
        // set the owning side to null (unless already changed)
        if ($this->masterclasses->removeElement($masterclass) && $masterclass->getTeacher() === $this) {
            $masterclass->setTeacher(null);
        }

        return $this;
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

    public function getInstrument(): ?Category
    {
        return $this->instrument;
    }

    public function setInstrument(?Category $instrument): static
    {
        $this->instrument = $instrument;

        return $this;
    }

    /**
     * @return Collection<int, Favorites>
     */
    public function getFavorites(): Collection
    {
        return $this->favorites;
    }

    public function addFavorite(Favorites $favorite): static
    {
        if (!$this->favorites->contains($favorite)) {
            $this->favorites->add($favorite);
            $favorite->setUser($this);
        }

        return $this;
    }

    public function removeFavorite(Favorites $favorite): static
    {
        // set the owning side to null (unless already changed)
        if ($this->favorites->removeElement($favorite) && $favorite->getUser() === $this) {
            $favorite->setUser(null);
        }

        return $this;
    }

    public function getUserAvatar(): ?UserAvatar
    {
        return $this->userAvatar;
    }

    public function setUserAvatar(UserAvatar $userAvatar): static
    {
        // set the owning side of the relation if necessary
        if ($userAvatar->getUser() !== $this) {
            $userAvatar->setUser($this);
        }

        $this->userAvatar = $userAvatar;

        return $this;
    }

    /**
     * @return Collection<int, Like>
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): static
    {
        if (!$this->likes->contains($like)) {
            $this->likes->add($like);
            $like->setUser($this);
        }

        return $this;
    }

    public function removeLike(Like $like): static
    {
        // set the owning side to null (unless already changed)
        if ($this->likes->removeElement($like) && $like->getUser() === $this) {
            $like->setUser(null);
        }

        return $this;
    }
}
