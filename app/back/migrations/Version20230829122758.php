<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20230829122758 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'migration to up to date all schemas';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE badge_image (id INT AUTO_INCREMENT NOT NULL, badge_id INT DEFAULT NULL, image_path VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_A1F2A273F7A2C2FC (badge_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lesson_user (id INT AUTO_INCREMENT NOT NULL, lesson_id INT NOT NULL, section_user_id INT NOT NULL, validated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', deleted_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_B4E2102DCDF80196 (lesson_id), INDEX IDX_B4E2102D75291E9A (section_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE section_user (id INT AUTO_INCREMENT NOT NULL, section_id INT NOT NULL, masterclass_user_id INT NOT NULL, validated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', deleted_at DATETIME DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_82D3A42D823E37A (section_id), INDEX IDX_82D3A42A598A9DF (masterclass_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE work_audio (id INT AUTO_INCREMENT NOT NULL, work_id INT NOT NULL, size INT DEFAULT NULL, audio_path VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_30864DBABB3453DB (work_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE work_score (id INT AUTO_INCREMENT NOT NULL, work_id INT NOT NULL, work_path VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_1A624C7EBB3453DB (work_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE badge_image ADD CONSTRAINT FK_A1F2A273F7A2C2FC FOREIGN KEY (badge_id) REFERENCES badge (id)');
        $this->addSql('ALTER TABLE lesson_user ADD CONSTRAINT FK_B4E2102DCDF80196 FOREIGN KEY (lesson_id) REFERENCES lesson (id)');
        $this->addSql('ALTER TABLE lesson_user ADD CONSTRAINT FK_B4E2102D75291E9A FOREIGN KEY (section_user_id) REFERENCES section_user (id)');
        $this->addSql('ALTER TABLE section_user ADD CONSTRAINT FK_82D3A42D823E37A FOREIGN KEY (section_id) REFERENCES section (id)');
        $this->addSql('ALTER TABLE section_user ADD CONSTRAINT FK_82D3A42A598A9DF FOREIGN KEY (masterclass_user_id) REFERENCES masterclass_user (id)');
        $this->addSql('ALTER TABLE work_audio ADD CONSTRAINT FK_30864DBABB3453DB FOREIGN KEY (work_id) REFERENCES work (id)');
        $this->addSql('ALTER TABLE work_score ADD CONSTRAINT FK_1A624C7EBB3453DB FOREIGN KEY (work_id) REFERENCES work (id)');
        $this->addSql('ALTER TABLE badge DROP image_path');
        $this->addSql('ALTER TABLE composer CHANGE nationality nationality VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE favorites CHANGE masterclass_id masterclass_id INT DEFAULT NULL, CHANGE work_id work_id INT DEFAULT NULL, CHANGE composer_id composer_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE lesson ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, CHANGE section_id section_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE lesson_video ADD video_url VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE `like` ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE masterclass ADD category_id INT DEFAULT NULL, ADD deleted_at DATETIME DEFAULT NULL, ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE masterclass ADD CONSTRAINT FK_9BDB44ED12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_9BDB44ED12469DE2 ON masterclass (category_id)');
        $this->addSql('ALTER TABLE masterclass_user ADD validated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT NULL, DROP added_at');
        $this->addSql('ALTER TABLE section ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, CHANGE masterclass_id masterclass_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE work ADD name VARCHAR(255) NOT NULL, ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, DROP image_path, DROP partition_path, DROP audio_path, CHANGE category_id category_id INT DEFAULT NULL, CHANGE composer_id composer_id INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE badge_image DROP FOREIGN KEY FK_A1F2A273F7A2C2FC');
        $this->addSql('ALTER TABLE lesson_user DROP FOREIGN KEY FK_B4E2102DCDF80196');
        $this->addSql('ALTER TABLE lesson_user DROP FOREIGN KEY FK_B4E2102D75291E9A');
        $this->addSql('ALTER TABLE section_user DROP FOREIGN KEY FK_82D3A42D823E37A');
        $this->addSql('ALTER TABLE section_user DROP FOREIGN KEY FK_82D3A42A598A9DF');
        $this->addSql('ALTER TABLE work_audio DROP FOREIGN KEY FK_30864DBABB3453DB');
        $this->addSql('ALTER TABLE work_score DROP FOREIGN KEY FK_1A624C7EBB3453DB');
        $this->addSql('DROP TABLE badge_image');
        $this->addSql('DROP TABLE lesson_user');
        $this->addSql('DROP TABLE section_user');
        $this->addSql('DROP TABLE work_audio');
        $this->addSql('DROP TABLE work_score');
        $this->addSql('ALTER TABLE work ADD image_path VARCHAR(255) DEFAULT NULL, ADD partition_path VARCHAR(255) DEFAULT NULL, ADD audio_path VARCHAR(255) DEFAULT NULL, DROP name, DROP created_at, DROP updated_at, CHANGE category_id category_id INT NOT NULL, CHANGE composer_id composer_id INT NOT NULL');
        $this->addSql('ALTER TABLE badge ADD image_path VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE `like` DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE section DROP created_at, DROP updated_at, CHANGE masterclass_id masterclass_id INT NOT NULL');
        $this->addSql('ALTER TABLE lesson DROP created_at, DROP updated_at, CHANGE section_id section_id INT NOT NULL');
        $this->addSql('ALTER TABLE composer CHANGE nationality nationality VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE masterclass_user ADD added_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', DROP validated_at, DROP created_at, DROP updated_at, DROP deleted_at');
        $this->addSql('ALTER TABLE favorites CHANGE masterclass_id masterclass_id INT NOT NULL, CHANGE work_id work_id INT NOT NULL, CHANGE composer_id composer_id INT NOT NULL');
        $this->addSql('ALTER TABLE masterclass DROP FOREIGN KEY FK_9BDB44ED12469DE2');
        $this->addSql('DROP INDEX IDX_9BDB44ED12469DE2 ON masterclass');
        $this->addSql('ALTER TABLE masterclass DROP category_id, DROP deleted_at, DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE lesson_video DROP video_url');
    }
}
