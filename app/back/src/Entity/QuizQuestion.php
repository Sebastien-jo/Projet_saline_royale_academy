<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
#[ApiResource]
class QuizQuestion extends AbstractEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $position = null;

    #[ORM\Column(length: 255)]
    private ?string $question = null;

    #[ORM\OneToMany(mappedBy: 'question', targetEntity: OptionQuizQuestion::class, orphanRemoval: true)]
    private Collection $optionQuizQuestions;

    #[ORM\OneToMany(mappedBy: 'question', targetEntity: QuizResponse::class, orphanRemoval: true)]
    private Collection $quizResponses;

    public function __construct(array $array = [])
    {
        parent::__construct($array);
        $this->optionQuizQuestions = new ArrayCollection();
        $this->quizResponses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): self
    {
        $this->question = $question;

        return $this;
    }

    /**
     * @return Collection<int, OptionQuizQuestion>
     */
    public function getOptionQuizQuestions(): Collection
    {
        return $this->optionQuizQuestions;
    }

    public function addOptionQuizQuestion(OptionQuizQuestion $optionQuizQuestion): self
    {
        if (!$this->optionQuizQuestions->contains($optionQuizQuestion)) {
            $this->optionQuizQuestions->add($optionQuizQuestion);
            $optionQuizQuestion->setQuestion($this);
        }

        return $this;
    }

    public function removeOptionQuizQuestion(OptionQuizQuestion $optionQuizQuestion): self
    {
        // set the owning side to null (unless already changed)
        if ($this->optionQuizQuestions->removeElement($optionQuizQuestion) && $optionQuizQuestion->getQuestion() === $this) {
            $optionQuizQuestion->setQuestion(null);
        }

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
            $quizResponse->setQuestion($this);
        }

        return $this;
    }

    public function removeQuizResponse(QuizResponse $quizResponse): self
    {
        // set the owning side to null (unless already changed)
        if ($this->quizResponses->removeElement($quizResponse) && $quizResponse->getQuestion() === $this) {
            $quizResponse->setQuestion(null);
        }

        return $this;
    }
}
