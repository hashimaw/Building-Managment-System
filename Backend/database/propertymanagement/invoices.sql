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

-- Dumping structure for table propertymanagement.invoices
CREATE TABLE IF NOT EXISTS `invoices` (
  `invoice_id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `shop_id` varchar(50) NOT NULL,
  `shareholder_id` int(11) NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `duration` int(11) NOT NULL,
  `shop_price` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`invoice_id`),
  KEY `fk_invoices_tenants` (`tenant_id`) USING BTREE,
  KEY `fk_invoices_shop_id` (`shop_id`),
  KEY `fk_invoices_shareholders` (`shareholder_id`),
  CONSTRAINT `FK_invoices_tenants` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`tenant_id`),
  CONSTRAINT `fk_invoices_shareholders` FOREIGN KEY (`shareholder_id`) REFERENCES `shareholders` (`shareholder_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoices_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`shop_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table propertymanagement.invoices: ~27 rows (approximately)
INSERT INTO `invoices` (`invoice_id`, `tenant_id`, `shop_id`, `shareholder_id`, `date_from`, `date_to`, `duration`, `shop_price`, `active`, `created_at`) VALUES
	(44, 1010, 'G-31', 7004, '2024-10-02', '2024-12-01', 2, 8000, 1, '2024-10-15 22:41:42'),
	(45, 1011, 'G-17', 7017, '2024-10-07', '2024-12-06', 2, 6000, 1, '2024-10-15 22:42:16'),
	(46, 1012, 'G-25', 7022, '2024-10-17', '2025-01-15', 3, 8000, 1, '2024-10-15 22:42:40'),
	(47, 1013, 'G-03', 7006, '2024-10-06', '2025-03-05', 5, 8000, 1, '2024-10-15 22:43:24'),
	(48, 1014, 'G-24', 7004, '2024-10-01', '2024-10-22', 1, 8000, 1, '2024-10-15 22:43:49'),
	(49, 1015, 'G-04', 7007, '2024-09-04', '2024-11-03', 2, 8000, 1, '2024-10-15 22:44:23'),
	(50, 1016, 'G-02', 7005, '2024-10-06', '2024-11-05', 1, 8000, 1, '2024-10-15 22:44:40'),
	(51, 1017, 'G-05', 7005, '2024-09-30', '2024-12-29', 3, 8000, 1, '2024-10-15 22:44:59'),
	(52, 1018, 'G-16', 7004, '2024-09-06', '2024-12-05', 3, 8000, 1, '2024-10-15 22:45:28'),
	(53, 1019, 'G-18', 7018, '2024-10-07', '2025-01-05', 3, 8000, 1, '2024-10-15 22:45:53'),
	(54, 1020, 'G-27', 7011, '2024-09-18', '2025-01-16', 4, 8000, 1, '2024-10-15 22:46:18'),
	(55, 1021, 'G-12', 7014, '2024-09-12', '2025-01-10', 4, 8000, 1, '2024-10-15 22:46:40'),
	(56, 1022, 'G-20', 7019, '2024-08-06', '2024-12-04', 4, 10000, 1, '2024-10-15 22:47:04'),
	(57, 1023, 'G-01', 7004, '2024-09-10', '2025-03-09', 6, 10000, 1, '2024-10-15 22:47:40'),
	(58, 1024, 'G-06', 7008, '2024-10-17', '2024-11-16', 1, 10000, 1, '2024-10-15 22:48:05'),
	(59, 1025, 'G-15', 7016, '2024-09-11', '2024-12-10', 3, 10000, 1, '2024-10-15 22:48:24'),
	(60, 1026, 'G-19', 7011, '2024-10-30', '2025-01-28', 3, 10000, 1, '2024-10-15 22:48:55'),
	(61, 1027, 'G-21', 7005, '2024-10-16', '2024-10-24', 1, 10000, 1, '2024-10-15 22:49:12'),
	(62, 1028, 'G-22', 7020, '2024-09-01', '2025-02-28', 6, 10000, 1, '2024-10-15 22:49:32'),
	(63, 1029, 'G-23', 7021, '2024-10-13', '2024-12-12', 2, 10000, 1, '2024-10-15 22:49:52'),
	(64, 1030, '102', 7018, '2024-10-01', '2024-10-10', 1, 7000, 1, '2024-10-15 22:50:10'),
	(65, 1031, 'G-30', 7026, '2024-10-16', '2025-01-14', 3, 6000, 1, '2024-10-15 22:50:27'),
	(66, 1032, 'G-09', 7011, '2024-09-30', '2024-11-29', 2, 6000, 1, '2024-10-15 22:50:42'),
	(67, 1033, '132', 7006, '2024-10-01', '2025-05-29', 8, 7000, 1, '2024-10-15 22:50:59'),
	(68, 1030, '102', 7018, '2024-10-10', '2024-12-09', 2, 7000, 1, '2024-10-15 23:22:11'),
	(69, 1014, 'G-24', 7004, '2024-09-13', '2024-10-13', 1, 8000, 0, '2024-10-16 16:26:08'),
	(70, 1014, 'G-24', 7004, '2024-10-22', '2025-01-20', 3, 8000, 1, '2024-10-17 14:06:32');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
