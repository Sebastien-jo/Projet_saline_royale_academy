<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230713103440 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE composer_category (composer_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_6D89E89F7A8D2620 (composer_id), INDEX IDX_6D89E89F12469DE2 (category_id), PRIMARY KEY(composer_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE favorites (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, masterclass_id INT NOT NULL, work_id INT NOT NULL, composer_id INT NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_E46960F5A76ED395 (user_id), INDEX IDX_E46960F5426F0705 (masterclass_id), INDEX IDX_E46960F5BB3453DB (work_id), INDEX IDX_E46960F57A8D2620 (composer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `like` (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, forum_id INT NOT NULL, INDEX IDX_AC6340B3A76ED395 (user_id), INDEX IDX_AC6340B329CCBAD0 (forum_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE composer_category ADD CONSTRAINT FK_6D89E89F7A8D2620 FOREIGN KEY (composer_id) REFERENCES composer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE composer_category ADD CONSTRAINT FK_6D89E89F12469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE favorites ADD CONSTRAINT FK_E46960F5A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE favorites ADD CONSTRAINT FK_E46960F5426F0705 FOREIGN KEY (masterclass_id) REFERENCES masterclass (id)');
        $this->addSql('ALTER TABLE favorites ADD CONSTRAINT FK_E46960F5BB3453DB FOREIGN KEY (work_id) REFERENCES work (id)');
        $this->addSql('ALTER TABLE favorites ADD CONSTRAINT FK_E46960F57A8D2620 FOREIGN KEY (composer_id) REFERENCES composer (id)');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `like` ADD CONSTRAINT FK_AC6340B329CCBAD0 FOREIGN KEY (forum_id) REFERENCES forum (id)');
        $this->addSql('ALTER TABLE composer ADD picture VARCHAR(255) DEFAULT NULL, ADD description VARCHAR(255) DEFAULT NULL, CHANGE portrait nationality VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE forum ADD is_closed TINYINT(1) NOT NULL, ADD title VARCHAR(255) NOT NULL, CHANGE name description VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE forum_message DROP INDEX UNIQ_47717D0E727ACA70, ADD INDEX IDX_47717D0E727ACA70 (parent_id)');
        $this->addSql('ALTER TABLE forum_message ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, CHANGE forum_id forum_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD instrument_id INT DEFAULT NULL, DROP instrument');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649CF11D9C FOREIGN KEY (instrument_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649CF11D9C ON user (instrument_id)');
        $this->addSql('ALTER TABLE work ADD description VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composer_category DROP FOREIGN KEY FK_6D89E89F7A8D2620');
        $this->addSql('ALTER TABLE composer_category DROP FOREIGN KEY FK_6D89E89F12469DE2');
        $this->addSql('ALTER TABLE favorites DROP FOREIGN KEY FK_E46960F5A76ED395');
        $this->addSql('ALTER TABLE favorites DROP FOREIGN KEY FK_E46960F5426F0705');
        $this->addSql('ALTER TABLE favorites DROP FOREIGN KEY FK_E46960F5BB3453DB');
        $this->addSql('ALTER TABLE favorites DROP FOREIGN KEY FK_E46960F57A8D2620');
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B3A76ED395');
        $this->addSql('ALTER TABLE `like` DROP FOREIGN KEY FK_AC6340B329CCBAD0');
        $this->addSql('DROP TABLE composer_category');
        $this->addSql('DROP TABLE favorites');
        $this->addSql('DROP TABLE `like`');
        $this->addSql('ALTER TABLE work DROP description');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649CF11D9C');
        $this->addSql('DROP INDEX IDX_8D93D649CF11D9C ON user');
        $this->addSql('ALTER TABLE user ADD instrument LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', DROP instrument_id');
        $this->addSql('ALTER TABLE forum_message DROP INDEX IDX_47717D0E727ACA70, ADD UNIQUE INDEX UNIQ_47717D0E727ACA70 (parent_id)');
        $this->addSql('ALTER TABLE forum_message DROP created_at, DROP updated_at, CHANGE forum_id forum_id INT NOT NULL');
        $this->addSql('ALTER TABLE forum ADD name VARCHAR(255) NOT NULL, DROP is_closed, DROP description, DROP title');
        $this->addSql('ALTER TABLE composer DROP picture, DROP description, CHANGE nationality portrait VARCHAR(255) NOT NULL');
    }
}
