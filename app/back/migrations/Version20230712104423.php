<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230712104423 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE exercise_response (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, lesson_exercise_id INT NOT NULL, INDEX IDX_3817AB13A76ED395 (user_id), INDEX IDX_3817AB1318ED7E11 (lesson_exercise_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lesson_exercise (id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_avatar (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, image_path VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_73256912A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE exercise_response ADD CONSTRAINT FK_3817AB13A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE exercise_response ADD CONSTRAINT FK_3817AB1318ED7E11 FOREIGN KEY (lesson_exercise_id) REFERENCES lesson_exercise (id)');
        $this->addSql('ALTER TABLE lesson_exercise ADD CONSTRAINT FK_E69D9F05BF396750 FOREIGN KEY (id) REFERENCES lesson (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_avatar ADD CONSTRAINT FK_73256912A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE lesson_quiz DROP FOREIGN KEY FK_9D633CF6BF396750');
        $this->addSql('ALTER TABLE quiz_response DROP FOREIGN KEY FK_E8BFF2BE1E27F6BF');
        $this->addSql('ALTER TABLE quiz_response DROP FOREIGN KEY FK_E8BFF2BEA76ED395');
        $this->addSql('ALTER TABLE option_quiz_question DROP FOREIGN KEY FK_F22D14D31E27F6BF');
        $this->addSql('DROP TABLE lesson_quiz');
        $this->addSql('DROP TABLE quiz_response');
        $this->addSql('DROP TABLE option_quiz_question');
        $this->addSql('DROP TABLE quiz_question');
        $this->addSql('ALTER TABLE user DROP avatar_path');
        $this->addSql('ALTER TABLE work ADD composer_id INT NOT NULL, ADD partition_path VARCHAR(255) DEFAULT NULL, ADD audio_path VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE work ADD CONSTRAINT FK_534E68807A8D2620 FOREIGN KEY (composer_id) REFERENCES composer (id)');
        $this->addSql('CREATE INDEX IDX_534E68807A8D2620 ON work (composer_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE lesson_quiz (id INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE quiz_response (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, question_id INT NOT NULL, INDEX IDX_E8BFF2BEA76ED395 (user_id), INDEX IDX_E8BFF2BE1E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE option_quiz_question (id INT AUTO_INCREMENT NOT NULL, question_id INT NOT NULL, content VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, is_valid TINYINT(1) NOT NULL, INDEX IDX_F22D14D31E27F6BF (question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE quiz_question (id INT AUTO_INCREMENT NOT NULL, position SMALLINT NOT NULL, question VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE lesson_quiz ADD CONSTRAINT FK_9D633CF6BF396750 FOREIGN KEY (id) REFERENCES lesson (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE quiz_response ADD CONSTRAINT FK_E8BFF2BE1E27F6BF FOREIGN KEY (question_id) REFERENCES quiz_question (id)');
        $this->addSql('ALTER TABLE quiz_response ADD CONSTRAINT FK_E8BFF2BEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE option_quiz_question ADD CONSTRAINT FK_F22D14D31E27F6BF FOREIGN KEY (question_id) REFERENCES quiz_question (id)');
        $this->addSql('ALTER TABLE exercise_response DROP FOREIGN KEY FK_3817AB13A76ED395');
        $this->addSql('ALTER TABLE exercise_response DROP FOREIGN KEY FK_3817AB1318ED7E11');
        $this->addSql('ALTER TABLE lesson_exercise DROP FOREIGN KEY FK_E69D9F05BF396750');
        $this->addSql('ALTER TABLE user_avatar DROP FOREIGN KEY FK_73256912A76ED395');
        $this->addSql('DROP TABLE exercise_response');
        $this->addSql('DROP TABLE lesson_exercise');
        $this->addSql('DROP TABLE user_avatar');
        $this->addSql('ALTER TABLE work DROP FOREIGN KEY FK_534E68807A8D2620');
        $this->addSql('DROP INDEX IDX_534E68807A8D2620 ON work');
        $this->addSql('ALTER TABLE work DROP composer_id, DROP partition_path, DROP audio_path');
        $this->addSql('ALTER TABLE user ADD avatar_path VARCHAR(255) DEFAULT NULL');
    }
}
