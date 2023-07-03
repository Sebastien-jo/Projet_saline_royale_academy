<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230701205744 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE masterclass_user (id INT AUTO_INCREMENT NOT NULL, added_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE masterclass_user_user (masterclass_user_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_4D54A7DBA598A9DF (masterclass_user_id), INDEX IDX_4D54A7DBA76ED395 (user_id), PRIMARY KEY(masterclass_user_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE masterclass_user_masterclass (masterclass_user_id INT NOT NULL, masterclass_id INT NOT NULL, INDEX IDX_E8A2751A598A9DF (masterclass_user_id), INDEX IDX_E8A2751426F0705 (masterclass_id), PRIMARY KEY(masterclass_user_id, masterclass_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE masterclass_user_user ADD CONSTRAINT FK_4D54A7DBA598A9DF FOREIGN KEY (masterclass_user_id) REFERENCES masterclass_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE masterclass_user_user ADD CONSTRAINT FK_4D54A7DBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE masterclass_user_masterclass ADD CONSTRAINT FK_E8A2751A598A9DF FOREIGN KEY (masterclass_user_id) REFERENCES masterclass_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE masterclass_user_masterclass ADD CONSTRAINT FK_E8A2751426F0705 FOREIGN KEY (masterclass_id) REFERENCES masterclass (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE masterclass_user_user DROP FOREIGN KEY FK_4D54A7DBA598A9DF');
        $this->addSql('ALTER TABLE masterclass_user_user DROP FOREIGN KEY FK_4D54A7DBA76ED395');
        $this->addSql('ALTER TABLE masterclass_user_masterclass DROP FOREIGN KEY FK_E8A2751A598A9DF');
        $this->addSql('ALTER TABLE masterclass_user_masterclass DROP FOREIGN KEY FK_E8A2751426F0705');
        $this->addSql('DROP TABLE masterclass_user');
        $this->addSql('DROP TABLE masterclass_user_user');
        $this->addSql('DROP TABLE masterclass_user_masterclass');
    }
}
