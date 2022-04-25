import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterSpecificationsCars1650921262974
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("specifications_cars", "id");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"specifications_cars",
			new TableColumn({
				name: "id",
				type: "uuid",
				isPrimary: true,
			})
		);
	}
}
