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

-- Dumping structure for table propertymanagement.shareholders
CREATE TABLE IF NOT EXISTS `shareholders` (
  `shareholder_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` char(1) NOT NULL,
  `phone` int(11) NOT NULL DEFAULT 251,
  `balance` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`shareholder_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7027 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table propertymanagement.shareholders: ~23 rows (approximately)
INSERT INTO `shareholders` (`shareholder_id`, `first_name`, `last_name`, `gender`, `phone`, `balance`) VALUES
	(7004, 'Issa', 'Kassa', 'M', 935350000, 110000.03999999998),
	(7005, 'Seid', 'Abdella', 'M', 930033636, 22000.030000000006),
	(7006, 'Zeyineb', 'Muhammed', 'F', 251, 82665.01999999999),
	(7007, 'Kelifa', 'Hussien', 'M', 251, 9335.01),
	(7008, 'Haji', 'Ali', 'M', 251, 3335.01),
	(7009, 'A/kadir', 'Awol', 'M', 251, 0),
	(7010, 'Muhammed', 'Seid', 'M', 251, 0),
	(7011, 'Abubeker', 'Ahmed', 'M', 911601174, 54000.030000000006),
	(7012, 'Jafer', 'Abubeker', 'M', 251, 0),
	(7013, 'Nura', 'Issa', 'F', 251, 0),
	(7014, 'Yassin', 'Muhammed', 'M', 251, 25335.009999999995),
	(7015, 'Habtamu', 'A.', 'M', 251, 0),
	(7016, 'Suleman', 'Abdella', 'M', 251, 23335.009999999995),
	(7017, 'Addis', 'Mekonen', 'M', 251, 5335.01),
	(7018, 'Adill', 'Hussien', 'M', 251, 31665.019999999993),
	(7019, 'Adem', 'Jibril', 'M', 251, 33335.009999999995),
	(7020, 'Anwar', 'Hamid', 'M', 251, 53335.009999999995),
	(7021, 'Hadiya', 'Berihun', 'F', 251, 13335.01),
	(7022, 'Hayat', 'Nuruhussien', 'F', 251, 17335.009999999995),
	(7023, 'Dessie', 'Mekonen', 'M', 251, 0),
	(7024, 'Medina', 'Ali', 'F', 251, 0),
	(7025, 'Adem', 'Muhammed', 'M', 251, 0),
	(7026, 'Ahmed', 'Ali', 'M', 251, 11335.01);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
