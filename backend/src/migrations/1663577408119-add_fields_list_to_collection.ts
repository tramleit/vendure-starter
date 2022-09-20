import {MigrationInterface, QueryRunner} from "typeorm";

export class addFieldsListToCollection1663577408119 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "collection" ADD "customFieldsShow_in_list" boolean DEFAULT true`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "customFieldsShow_in_list"`, undefined);
   }

}
