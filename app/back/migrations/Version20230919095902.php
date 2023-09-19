<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230919095902 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category CHANGE description description LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE composer CHANGE description description LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE forum CHANGE description description LONGTEXT NOT NULL');
        $this->addSql('ALTER TABLE work CHANGE description description LONGTEXT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE work CHANGE description description VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE category CHANGE description description VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE forum CHANGE description description VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE composer CHANGE description description VARCHAR(255) DEFAULT NULL');
    }
}
