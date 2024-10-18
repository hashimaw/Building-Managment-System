-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.5.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table propertymanagement.shops
CREATE TABLE IF NOT EXISTS `shops` (
  `shop_id` varchar(50) NOT NULL DEFAULT 'AUTO_INCREMENT',
  `price` int(11) NOT NULL,
  `floor` int(11) NOT NULL,
  `rented` bit(1) NOT NULL DEFAULT b'0',
  `tenant_id` int(11) DEFAULT NULL,
  `shareholder_id` int(11) NOT NULL,
  PRIMARY KEY (`shop_id`),
  KEY `fk_shops_tenant_id` (`tenant_id`),
  KEY `fk_shops_shareholder_id` (`shareholder_id`),
  CONSTRAINT `fk_shops_shareholder_id` FOREIGN KEY (`shareholder_id`) REFERENCES `shareholders` (`shareholder_id`),
  CONSTRAINT `fk_shops_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table propertymanagement.shops: ~24 rows (approximately)
INSERT INTO `shops` (`shop_id`, `price`, `floor`, `rented`, `tenant_id`, `shareholder_id`) VALUES
	('102', 7000, 1, b'1', 1030, 7018),
	('132', 7000, 1, b'1', 1033, 7006),
	('G-01', 10000, 0, b'1', 1023, 7004),
	('G-02', 8000, 0, b'1', 1016, 7005),
	('G-03', 8000, 0, b'1', 1013, 7006),
	('G-04', 8000, 0, b'1', 1015, 7007),
	('G-05', 8000, 0, b'1', 1017, 7005),
	('G-06', 10000, 0, b'1', 1024, 7008),
	('G-09', 6000, 0, b'1', 1032, 7011),
	('G-12', 8000, 0, b'1', 1021, 7014),
	('G-15', 10000, 0, b'1', 1025, 7016),
	('G-16', 8000, 0, b'1', 1018, 7004),
	('G-17', 6000, 0, b'1', 1011, 7017),
	('G-18', 8000, 0, b'1', 1019, 7018),
	('G-19', 10000, 0, b'1', 1026, 7011),
	('G-20', 10000, 0, b'1', 1022, 7019),
	('G-21', 10000, 0, b'1', 1027, 7005),
	('G-22', 10000, 0, b'1', 1028, 7020),
	('G-23', 10000, 0, b'1', 1029, 7021),
	('G-24', 8000, 0, b'1', 1014, 7004),
	('G-25', 8000, 0, b'1', 1012, 7022),
	('G-27', 8000, 0, b'1', 1020, 7011),
	('G-30', 6000, 0, b'1', 1031, 7026),
	('G-31', 8000, 0, b'1', 1010, 7004);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
