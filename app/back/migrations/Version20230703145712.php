<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230703145712 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE badge_translation (id INT AUTO_INCREMENT NOT NULL, translatable_id INT DEFAULT NULL, locale VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, INDEX IDX_5A9077B82C2AC5D3 (translatable_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE badge_translation ADD CONSTRAINT FK_5A9077B82C2AC5D3 FOREIGN KEY (translatable_id) REFERENCES badge (id)');
        $this->addSql('ALTER TABLE masterclass_user_user DROP FOREIGN KEY FK_4D54A7DBA598A9DF');
        $this->addSql('ALTER TABLE masterclass_user_user DROP FOREIGN KEY FK_4D54A7DBA76ED395');
        $this->addSql('ALTER TABLE masterclass_user_masterclass DROP FOREIGN KEY FK_E8A2751A598A9DF');
        $this->addSql('ALTER TABLE masterclass_user_masterclass DROP FOREIGN KEY FK_E8A2751426F0705');
        $this->addSql('DROP TABLE masterclass_user_user');
        $this->addSql('DROP TABLE masterclass_user_masterclass');
        $this->addSql('ALTER TABLE badge DROP description, CHANGE name category VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE masterclass ADD teacher_id INT NOT NULL');
        $this->addSql('ALTER TABLE masterclass ADD CONSTRAINT FK_9BDB44ED41807E1D FOREIGN KEY (teacher_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_9BDB44ED41807E1D ON masterclass (teacher_id)');
        $this->addSql('ALTER TABLE masterclass_user ADD masterclass_id INT NOT NULL, ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE masterclass_user ADD CONSTRAINT FK_7EDE356426F0705 FOREIGN KEY (masterclass_id) REFERENCES masterclass (id)');
        $this->addSql('ALTER TABLE masterclass_user ADD CONSTRAINT FK_7EDE356A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_7EDE356426F0705 ON masterclass_user (masterclass_id)');
        $this->addSql('CREATE INDEX IDX_7EDE356A76ED395 ON masterclass_user (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE masterclass_user_user (masterclass_user_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_4D54A7DBA598A9DF (masterclass_user_id), INDEX IDX_4D54A7DBA76ED395 (user_id), PRIMARY KEY(masterclass_user_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE masterclass_user_masterclass (masterclass_user_id INT NOT NULL, masterclass_id INT NOT NULL, INDEX IDX_E8A2751A598A9DF (masterclass_user_id), INDEX IDX_E8A2751426F0705 (masterclass_id), PRIMARY KEY(masterclass_user_id, masterclass_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE masterclass_user_user ADD CONSTRAINT FK_4D54A7DBA598A9DF FOREIGN KEY (masterclass_user_id) REFERENCES masterclass_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE masterclass_user_user ADD CONSTRAINT FK_4D54A7DBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE masterclass_user_masterclass ADD CONSTRAINT FK_E8A2751A598A9DF FOREIGN KEY (masterclass_user_id) REFERENCES masterclass_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE masterclass_user_masterclass ADD CONSTRAINT FK_E8A2751426F0705 FOREIGN KEY (masterclass_id) REFERENCES masterclass (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE badge_translation DROP FOREIGN KEY FK_5A9077B82C2AC5D3');
        $this->addSql('DROP TABLE badge_translation');
        $this->addSql('ALTER TABLE badge ADD description LONGTEXT NOT NULL, CHANGE category name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE masterclass_user DROP FOREIGN KEY FK_7EDE356426F0705');
        $this->addSql('ALTER TABLE masterclass_user DROP FOREIGN KEY FK_7EDE356A76ED395');
        $this->addSql('DROP INDEX IDX_7EDE356426F0705 ON masterclass_user');
        $this->addSql('DROP INDEX IDX_7EDE356A76ED395 ON masterclass_user');
        $this->addSql('ALTER TABLE masterclass_user DROP masterclass_id, DROP user_id');
        $this->addSql('ALTER TABLE masterclass DROP FOREIGN KEY FK_9BDB44ED41807E1D');
        $this->addSql('DROP INDEX IDX_9BDB44ED41807E1D ON masterclass');
        $this->addSql('ALTER TABLE masterclass DROP teacher_id');
    }
}
