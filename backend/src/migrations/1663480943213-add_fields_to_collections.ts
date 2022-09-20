import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldsToCollections1663480943213 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "collection" ADD "customFieldsShow_in_navbar" boolean DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "collection" ADD "customFieldsShow_in_home_page" boolean DEFAULT true`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "customFieldsShow_in_home_page"`, undefined);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "customFieldsShow_in_navbar"`, undefined);
   }

}
