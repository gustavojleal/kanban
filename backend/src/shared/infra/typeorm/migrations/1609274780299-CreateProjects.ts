import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProjects1609274780299 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(
            new Table({
                name: 'projects',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'createdBy_id',
                        type: 'varchar',
                    },
                    {
                        name: 'responsable_id',
                        type: 'varchar',
                    },
                    {
                        name: 'structure',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('projects');
    }

}
