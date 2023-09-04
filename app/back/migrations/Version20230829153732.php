<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use App\Enum\Instrument;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20230829153732 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'populate category table with instrument enum values';
    }

    public function up(Schema $schema): void
    {
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
