<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\Enum\Instrument;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230909111227 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change categories instruments';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('DELETE FROM category;');
        $instruments = Instrument::cases();
        foreach ($instruments as $instrument) {
            $this->addSql('INSERT INTO category (name) VALUES (\'' . $instrument->value . '\');');
        }
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DELETE FROM category;');
    }
}
