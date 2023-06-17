<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230609183152 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE forum_message ADD forum_id INT NOT NULL');
        $this->addSql('ALTER TABLE forum_message ADD CONSTRAINT FK_47717D0E29CCBAD0 FOREIGN KEY (forum_id) REFERENCES forum (id)');
        $this->addSql('CREATE INDEX IDX_47717D0E29CCBAD0 ON forum_message (forum_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE forum_message DROP FOREIGN KEY FK_47717D0E29CCBAD0');
        $this->addSql('DROP INDEX IDX_47717D0E29CCBAD0 ON forum_message');
        $this->addSql('ALTER TABLE forum_message DROP forum_id');
    }
}
