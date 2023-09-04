<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230904150454 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE composer_image (id INT AUTO_INCREMENT NOT NULL, composer_id INT NOT NULL, image_path VARCHAR(255) DEFAULT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, UNIQUE INDEX UNIQ_B4A2651B7A8D2620 (composer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE masterclass_image (id INT AUTO_INCREMENT NOT NULL, masterclass_id INT NOT NULL, image_path VARCHAR(255) DEFAULT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, UNIQUE INDEX UNIQ_48BF779F426F0705 (masterclass_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE composer_image ADD CONSTRAINT FK_B4A2651B7A8D2620 FOREIGN KEY (composer_id) REFERENCES composer (id)');
        $this->addSql('ALTER TABLE masterclass_image ADD CONSTRAINT FK_48BF779F426F0705 FOREIGN KEY (masterclass_id) REFERENCES masterclass (id)');
        $this->addSql('ALTER TABLE lesson_video CHANGE video_url video_url VARCHAR(5000) DEFAULT NULL');
        $this->addSql('ALTER TABLE masterclass DROP FOREIGN KEY FK_9BDB44ED12469DE2');
        $this->addSql('DROP INDEX IDX_9BDB44ED12469DE2 ON masterclass');
        $this->addSql('ALTER TABLE masterclass DROP category_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composer_image DROP FOREIGN KEY FK_B4A2651B7A8D2620');
        $this->addSql('ALTER TABLE masterclass_image DROP FOREIGN KEY FK_48BF779F426F0705');
        $this->addSql('DROP TABLE composer_image');
        $this->addSql('DROP TABLE masterclass_image');
        $this->addSql('ALTER TABLE masterclass ADD category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE masterclass ADD CONSTRAINT FK_9BDB44ED12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_9BDB44ED12469DE2 ON masterclass (category_id)');
        $this->addSql('ALTER TABLE lesson_video CHANGE video_url video_url VARCHAR(255) DEFAULT NULL');
    }
}
