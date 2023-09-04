<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20230829141402 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'migration to up to date all schemas';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE badge ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE category ADD description VARCHAR(255) DEFAULT NULL, ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE composer ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE exercise_response ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE lesson_exercise ADD content LONGTEXT DEFAULT NULL, ADD url VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE badge DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE category DROP description, DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE lesson_exercise DROP content, DROP url');
        $this->addSql('ALTER TABLE composer DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE exercise_response DROP created_at, DROP updated_at');
    }
}
