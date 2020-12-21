import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1587180579661 implements MigrationInterface {
    name = 'createTable1587180579661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `business` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(30) NOT NULL, `account` varchar(30) NOT NULL, `password` varchar(30) NOT NULL, UNIQUE INDEX `IDX_887797cccd6ef4ba3b94407fcb` (`account`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(30) NOT NULL, `gender` varchar(30) NOT NULL, `birthday` varchar(30) NOT NULL, `email` varchar(30) NOT NULL, `phone` varchar(30) NOT NULL, `remark` varchar(30) NOT NULL, `createTime` date NOT NULL, `updateTime` date NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `relationship` (`id` int NOT NULL AUTO_INCREMENT, `businessID` varchar(30) NOT NULL, `clientId` int NULL, UNIQUE INDEX `REL_f40d075882d6872b20d9aafc17` (`clientId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `relationship` ADD CONSTRAINT `FK_f40d075882d6872b20d9aafc174` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `relationship` DROP FOREIGN KEY `FK_f40d075882d6872b20d9aafc174`", undefined);
        await queryRunner.query("DROP INDEX `REL_f40d075882d6872b20d9aafc17` ON `relationship`", undefined);
        await queryRunner.query("DROP TABLE `relationship`", undefined);
        await queryRunner.query("DROP TABLE `client`", undefined);
        await queryRunner.query("DROP INDEX `IDX_887797cccd6ef4ba3b94407fcb` ON `business`", undefined);
        await queryRunner.query("DROP TABLE `business`", undefined);
    }

}
