<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230607201157 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE badge (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, image_path VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE compositor (id INT AUTO_INCREMENT NOT NULL, last_name VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lesson (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, resume VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, position SMALLINT NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lesson_article (id INT NOT NULL, content LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lesson_quiz (id INT NOT NULL, questions LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE masterclass (id INT AUTO_INCREMENT NOT NULL, work_id INT NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_9BDB44EDBB3453DB (work_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE option_quiz_question (id INT AUTO_INCREMENT NOT NULL, question_id INT NOT NULL, content VARCHAR(255) NOT NULL, is_valid TINYINT(1) NOT NULL, INDEX IDX_F22D14D31E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE quiz_question (id INT AUTO_INCREMENT NOT NULL, position SMALLINT NOT NULL, question VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE quiz_response (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, question_id INT NOT NULL, INDEX IDX_E8BFF2BEA76ED395 (user_id), INDEX IDX_E8BFF2BE1E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE section (id INT AUTO_INCREMENT NOT NULL, masterclass_id INT NOT NULL, name VARCHAR(255) NOT NULL, position SMALLINT NOT NULL, INDEX IDX_2D737AEF426F0705 (masterclass_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_badge (user_id INT NOT NULL, badge_id INT NOT NULL, INDEX IDX_1C32B345A76ED395 (user_id), INDEX IDX_1C32B345F7A2C2FC (badge_id), PRIMARY KEY(user_id, badge_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE work (id INT AUTO_INCREMENT NOT NULL, category_id INT NOT NULL, date DATE NOT NULL, image_path VARCHAR(255) DEFAULT NULL, INDEX IDX_534E688012469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE lesson_article ADD CONSTRAINT FK_F7465CC1BF396750 FOREIGN KEY (id) REFERENCES lesson (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE lesson_quiz ADD CONSTRAINT FK_9D633CF6BF396750 FOREIGN KEY (id) REFERENCES lesson (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE masterclass ADD CONSTRAINT FK_9BDB44EDBB3453DB FOREIGN KEY (work_id) REFERENCES work (id)');
        $this->addSql('ALTER TABLE option_quiz_question ADD CONSTRAINT FK_F22D14D31E27F6BF FOREIGN KEY (question_id) REFERENCES quiz_question (id)');
        $this->addSql('ALTER TABLE quiz_response ADD CONSTRAINT FK_E8BFF2BEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE quiz_response ADD CONSTRAINT FK_E8BFF2BE1E27F6BF FOREIGN KEY (question_id) REFERENCES quiz_question (id)');
        $this->addSql('ALTER TABLE section ADD CONSTRAINT FK_2D737AEF426F0705 FOREIGN KEY (masterclass_id) REFERENCES masterclass (id)');
        $this->addSql('ALTER TABLE user_badge ADD CONSTRAINT FK_1C32B345A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_badge ADD CONSTRAINT FK_1C32B345F7A2C2FC FOREIGN KEY (badge_id) REFERENCES badge (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE work ADD CONSTRAINT FK_534E688012469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE lesson_article DROP FOREIGN KEY FK_F7465CC1BF396750');
        $this->addSql('ALTER TABLE lesson_quiz DROP FOREIGN KEY FK_9D633CF6BF396750');
        $this->addSql('ALTER TABLE masterclass DROP FOREIGN KEY FK_9BDB44EDBB3453DB');
        $this->addSql('ALTER TABLE option_quiz_question DROP FOREIGN KEY FK_F22D14D31E27F6BF');
        $this->addSql('ALTER TABLE quiz_response DROP FOREIGN KEY FK_E8BFF2BEA76ED395');
        $this->addSql('ALTER TABLE quiz_response DROP FOREIGN KEY FK_E8BFF2BE1E27F6BF');
        $this->addSql('ALTER TABLE section DROP FOREIGN KEY FK_2D737AEF426F0705');
        $this->addSql('ALTER TABLE user_badge DROP FOREIGN KEY FK_1C32B345A76ED395');
        $this->addSql('ALTER TABLE user_badge DROP FOREIGN KEY FK_1C32B345F7A2C2FC');
        $this->addSql('ALTER TABLE work DROP FOREIGN KEY FK_534E688012469DE2');
        $this->addSql('DROP TABLE badge');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE compositor');
        $this->addSql('DROP TABLE lesson');
        $this->addSql('DROP TABLE lesson_article');
        $this->addSql('DROP TABLE lesson_quiz');
        $this->addSql('DROP TABLE masterclass');
        $this->addSql('DROP TABLE media');
        $this->addSql('DROP TABLE option_quiz_question');
        $this->addSql('DROP TABLE quiz_question');
        $this->addSql('DROP TABLE quiz_response');
        $this->addSql('DROP TABLE section');
        $this->addSql('DROP TABLE user_badge');
        $this->addSql('DROP TABLE work');
    }
}
