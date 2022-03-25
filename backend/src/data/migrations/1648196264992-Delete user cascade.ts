import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteUserCascade1648196264992 implements MigrationInterface {
    name = 'DeleteUserCascade1648196264992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_723e67bde13b73c5404305feb14"`);
        await queryRunner.query(`ALTER TABLE "opportunity" DROP CONSTRAINT "FK_6ab46a8d0339d52fb0644ba6f87"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_312670d07e7e764737ef1973e66"`);
        await queryRunner.query(`ALTER TABLE "career_journey" DROP CONSTRAINT "FK_71dc448673114a7fa72fc43e5fc"`);
        await queryRunner.query(`ALTER TABLE "okr" DROP CONSTRAINT "FK_f445a84605e6864ba6c7926a095"`);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_69eb92e6b51565cf9a3d28f614b"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"`);
        await queryRunner.query(`ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448"`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_723e67bde13b73c5404305feb14" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "opportunity" ADD CONSTRAINT "FK_6ab46a8d0339d52fb0644ba6f87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_312670d07e7e764737ef1973e66" FOREIGN KEY ("mentorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "career_journey" ADD CONSTRAINT "FK_71dc448673114a7fa72fc43e5fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "okr" ADD CONSTRAINT "FK_f445a84605e6864ba6c7926a095" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_69eb92e6b51565cf9a3d28f614b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skill_category" DROP CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448"`);
        await queryRunner.query(`ALTER TABLE "user_quiz_category" DROP CONSTRAINT "FK_8474ba862ee38b0b26beafd644f"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_69eb92e6b51565cf9a3d28f614b"`);
        await queryRunner.query(`ALTER TABLE "okr" DROP CONSTRAINT "FK_f445a84605e6864ba6c7926a095"`);
        await queryRunner.query(`ALTER TABLE "career_journey" DROP CONSTRAINT "FK_71dc448673114a7fa72fc43e5fc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_312670d07e7e764737ef1973e66"`);
        await queryRunner.query(`ALTER TABLE "opportunity" DROP CONSTRAINT "FK_6ab46a8d0339d52fb0644ba6f87"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_723e67bde13b73c5404305feb14"`);
        await queryRunner.query(`ALTER TABLE "user_skill_category" ADD CONSTRAINT "FK_5c7b1c2323861c45a3b4f92a448" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_quiz_category" ADD CONSTRAINT "FK_8474ba862ee38b0b26beafd644f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_69eb92e6b51565cf9a3d28f614b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "okr" ADD CONSTRAINT "FK_f445a84605e6864ba6c7926a095" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "career_journey" ADD CONSTRAINT "FK_71dc448673114a7fa72fc43e5fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_312670d07e7e764737ef1973e66" FOREIGN KEY ("mentorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "opportunity" ADD CONSTRAINT "FK_6ab46a8d0339d52fb0644ba6f87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_723e67bde13b73c5404305feb14" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
