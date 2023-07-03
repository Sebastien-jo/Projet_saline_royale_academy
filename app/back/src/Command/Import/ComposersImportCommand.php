<?php

namespace App\Command\Import;

use App\Command\Service\Api\CompositeComposerFetcher;
use App\Entity\Composer;
use App\Entity\Traits\ConvertKeyTrait;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

#[AsCommand(
    name: 'app:import:composers',
    description: 'import all composer from https://api.openopus.org/composer/list/epoch/Classical.json in database'
)]
class ComposersImportCommand extends Command
{
    use ConvertKeyTrait;

    public function __construct(
        private readonly CompositeComposerFetcher $compositeComposerFetcher,
        private readonly EntityManagerInterface $entityManager,
        private readonly ValidatorInterface $validator,
        private readonly DenormalizerInterface $denormalizer,
        string $name = null,
    ) {
        parent::__construct($name);
    }

    protected function configure(): void
    {
    }

    /**
     * @throws TransportExceptionInterface
     * @throws ServerExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ClientExceptionInterface
     * @throws Exception|ExceptionInterface
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $composers = $this->compositeComposerFetcher->fetchData();

        foreach ($composers as $composerArray) {
            $composer = $this->denormalizer->denormalize($composerArray, Composer::class);

            $errors = $this->validator->validate($composer, null, ['import']);

            if (count($errors) > 0) {
                $io->error('Error on composer ' . $composer->getName());
                foreach ($errors as $error) {
                    $io->error($error->getMessage());
                }
                continue;
            }
            $this->entityManager->persist($composer);
            $this->entityManager->flush();
        }

        $output->writeln('Composers fetched and stored successfully.');
        $io->success('Composers imported successfully');

        return Command::SUCCESS;
    }
}
