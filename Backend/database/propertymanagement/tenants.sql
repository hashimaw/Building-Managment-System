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

-- Dumping structure for table propertymanagement.tenants
CREATE TABLE IF NOT EXISTS `tenants` (
  `tenant_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` char(1) NOT NULL,
  `phone` int(11) NOT NULL DEFAULT 251,
  `active` bit(1) NOT NULL,
  PRIMARY KEY (`tenant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1034 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table propertymanagement.tenants: ~24 rows (approximately)
INSERT INTO `tenants` (`tenant_id`, `first_name`, `last_name`, `gender`, `phone`, `active`) VALUES
	(1010, 'Yeshiwaget', 'Yilak', 'F', 251, b'1'),
	(1011, 'Assiya', 'Dawud', 'F', 251, b'1'),
	(1012, 'Meserte', 'Jajo', 'F', 251, b'1'),
	(1013, 'Mekides', 'Dereje', 'F', 251, b'1'),
	(1014, 'Teegist', 'Assefa', 'F', 251, b'1'),
	(1015, 'Tizita', 'g/her', 'F', 251, b'1'),
	(1016, 'Rihana', 'Ahmed', 'F', 251, b'1'),
	(1017, 'Natnael', 'Jibril', 'M', 251, b'1'),
	(1018, 'Etsegenet', 'Yosef', 'F', 251, b'1'),
	(1019, 'A/Hamid', 'Beyan', 'M', 251, b'1'),
	(1020, 'Dawit', 'Kassahun', 'M', 251, b'1'),
	(1021, 'Zahara', 'Sulleman', 'F', 251, b'1'),
	(1022, 'Abdu', 'Sulleman', 'M', 251, b'1'),
	(1023, 'Gedam', 'Mihret', 'F', 251, b'1'),
	(1024, 'A/Selam', 'Walle', 'M', 251, b'1'),
	(1025, 'Saffi', 'Muhammed', 'M', 251, b'1'),
	(1026, 'Betelihem', 'Sisay', 'F', 251, b'1'),
	(1027, 'Semira', 'Ahmed', 'F', 251, b'1'),
	(1028, 'Mahider', 'Assifaw', 'F', 251, b'1'),
	(1029, 'Abrham', 'Woldie', 'M', 251, b'1'),
	(1030, 'Sara', 'Alemayehu', 'F', 251, b'1'),
	(1031, 'Kal', 'Kinfemichael', 'F', 251, b'1'),
	(1032, 'Betelihem', 'negash', 'F', 251, b'1'),
	(1033, 'Zeyineb', 'Muhammed', 'F', 251, b'1');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
