import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRoleColum1746532110486 implements MigrationInterface {
    name = 'AddUserRoleColum1746532110486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "name" character varying`);
    }

}
