import {MigrationInterface, QueryRunner} from "typeorm";

export class mutants1695690105703 implements MigrationInterface {
    name = 'mutants1695690105703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stats_of_mutants" ("id" SERIAL NOT NULL, "dna_code" text array NOT NULL, "is_mutant" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c9319e0b5d6f903260d9d8f2c6d" UNIQUE ("dna_code"), CONSTRAINT "PK_340dd5f972dc6ef9e83b298b990" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c9319e0b5d6f903260d9d8f2c6" ON "stats_of_mutants" ("dna_code") `);
        await queryRunner.query(`CREATE INDEX "IDX_3751f19c13243cc0fbd2756ec9" ON "stats_of_mutants" ("is_mutant") `);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3751f19c13243cc0fbd2756ec9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9319e0b5d6f903260d9d8f2c6"`);
        await queryRunner.query(`DROP TABLE "stats_of_mutants"`);
    }

}
