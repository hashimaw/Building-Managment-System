/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS `costs` (
  `cost_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `date` date NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT '',
  `distributed` bit(1) NOT NULL,
  PRIMARY KEY (`cost_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `costs` (`cost_id`, `name`, `type`, `price`, `description`, `date`, `status`, `distributed`) VALUES
	(1, 'Dim-Light Decoration', 'order from administration', 20000, 'The Administration of Akaki Kality commanded all buildings to have dim light so the country\'s beauty increases', '2024-10-09', 'Completed', b'1'),
	(2, 'Sharing is caring', 'community works', 30000, 'as doctor abiy\'s visiion we are aiming big ', '2024-10-18', 'Completed', b'1'),
	(3, 'killing the wealthy', 'colonialism', 125000, 'yane be tliyan gize tebeddlem tedemren tegele tegelen neber', '2004-10-05', 'Completed', b'1'),
	(4, 'hjg', 'bhjh', 125000, 'jiijl.', '2024-10-16', 'Completed', b'1');

DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `DistributeCosts`(IN input_cost_id INT)
BEGIN
    -- Check and calculate cost per shop
    DECLARE cost_per_shop DECIMAL(10,2);

    SELECT price / (SELECT COUNT(*) FROM shops) INTO cost_per_shop
    FROM costs
    WHERE cost_id = input_cost_id AND distributed = 0;

    -- Update shareholders' balances
    UPDATE shareholders sh
    JOIN (
        SELECT
            s.shareholder_id,
            COUNT(s.shop_id) AS num_of_shops
        FROM
            shops s
        GROUP BY
            s.shareholder_id
    ) AS shop_counts ON sh.shareholder_id = shop_counts.shareholder_id
    SET
        sh.balance = sh.balance - (shop_counts.num_of_shops * cost_per_shop);

    -- Mark the cost as distributed
    UPDATE costs
    SET distributed = 1
    WHERE cost_id = input_cost_id;
END//
DELIMITER ;

CREATE TABLE IF NOT EXISTS `employeeinvoice` (
  `emp_invo_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `salary` int(11) NOT NULL,
  `duration_month` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `distributed` bit(1) NOT NULL,
  PRIMARY KEY (`emp_invo_id`),
  KEY `fk_employee_id_employees` (`employee_id`),
  CONSTRAINT `fk_employee_id_employees` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `employeeinvoice` (`emp_invo_id`, `employee_id`, `date_from`, `date_to`, `salary`, `duration_month`, `created_at`, `distributed`) VALUES
	(1, 2, '2024-10-12', '2024-12-11', 10000, 2, '2024-10-16 12:23:31', b'0'),
	(2, 3, '2024-10-08', '2024-11-07', 3000, 1, '2024-10-16 12:43:25', b'0'),
	(3, 4, '2024-10-17', '2025-01-15', 10000, 3, '2024-10-18 08:39:30', b'0');

CREATE TABLE IF NOT EXISTS `employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` char(10) NOT NULL,
  `position` varchar(50) NOT NULL,
  `phone` int(11) NOT NULL DEFAULT 251,
  `salary` int(11) NOT NULL,
  `employment_date` date NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `gender`, `position`, `phone`, `salary`, `employment_date`) VALUES
	(2, 'Dawude', 'Abdre', 'M', 'Admin', 912930093, 10000, '2024-10-12'),
	(3, 'Azalech', 'Gojebo', 'F', 'Janitor', 945455544, 3000, '2024-10-08'),
	(4, 'Hashim', 'Abdrehman', 'M', 'System Administrator', 936684258, 10000, '2024-10-17');

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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `invoices` (`invoice_id`, `tenant_id`, `shop_id`, `shareholder_id`, `date_from`, `date_to`, `duration`, `shop_price`, `active`, `created_at`) VALUES
	(44, 1010, 'G-31', 7004, '2024-10-02', '2024-12-01', 2, 8000, 1, '2024-10-15 22:41:42'),
	(45, 1011, 'G-17', 7017, '2024-10-07', '2024-12-06', 2, 6000, 1, '2024-10-15 22:42:16'),
	(46, 1012, 'G-25', 7022, '2024-10-17', '2025-01-15', 3, 8000, 1, '2024-10-15 22:42:40'),
	(47, 1013, 'G-03', 7006, '2024-10-06', '2025-03-05', 5, 8000, 1, '2024-10-15 22:43:24'),
	(48, 1014, 'G-24', 7004, '2024-10-01', '2024-10-22', 1, 8000, 1, '2024-10-15 22:43:49'),
	(49, 1015, 'G-04', 7007, '2024-09-04', '2024-10-25', 2, 8000, 1, '2024-10-15 22:44:23'),
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
	(61, 1027, 'G-21', 7005, '2024-10-16', '2024-10-17', 1, 10000, 1, '2024-10-15 22:49:12'),
	(62, 1028, 'G-22', 7020, '2024-09-01', '2025-02-28', 6, 10000, 1, '2024-10-15 22:49:32'),
	(63, 1029, 'G-23', 7021, '2024-10-13', '2024-12-12', 2, 10000, 1, '2024-10-15 22:49:52'),
	(64, 1030, '102', 7018, '2024-10-01', '2024-10-10', 1, 7000, 1, '2024-10-15 22:50:10'),
	(65, 1031, 'G-30', 7026, '2024-10-16', '2025-01-14', 3, 6000, 1, '2024-10-15 22:50:27'),
	(66, 1032, 'G-09', 7011, '2024-09-30', '2024-11-29', 2, 6000, 1, '2024-10-15 22:50:42'),
	(67, 1033, '132', 7006, '2024-10-01', '2025-05-29', 8, 7000, 1, '2024-10-15 22:50:59'),
	(68, 1030, '102', 7018, '2024-10-10', '2024-12-09', 2, 7000, 1, '2024-10-15 23:22:11'),
	(69, 1014, 'G-24', 7004, '2024-09-13', '2024-10-13', 1, 8000, 0, '2024-10-16 16:26:08'),
	(70, 1014, 'G-24', 7004, '2024-10-22', '2025-01-20', 3, 8000, 1, '2024-10-17 14:06:32'),
	(71, 1034, 'G-155', 7011, '2024-10-24', '2025-01-22', 3, 10000, 1, '2024-10-18 08:32:17'),
	(72, 1027, 'G-21', 7005, '2024-10-17', '2024-11-16', 1, 10000, 1, '2024-10-18 08:34:07'),
	(73, 1027, 'G-21', 7005, '2024-11-16', '2024-12-16', 1, 10000, 1, '2024-10-18 08:37:00');

CREATE TABLE IF NOT EXISTS `shareholders` (
  `shareholder_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` char(1) NOT NULL,
  `phone` int(11) NOT NULL DEFAULT 251,
  `balance` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`shareholder_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7027 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `shareholders` (`shareholder_id`, `first_name`, `last_name`, `gender`, `phone`, `balance`) VALUES
	(7004, 'Issa', 'Kassa', 'M', 935350000, 55200.03999999998),
	(7005, 'Seid', 'Abdella', 'M', 930033636, 8400.030000000006),
	(7006, 'Zeyineb', 'Muhammed', 'F', 251, 60265.01999999999),
	(7007, 'Kelifa', 'Hussien', 'M', 251, -1864.9899999999998),
	(7008, 'Haji', 'Ali', 'M', 251, -7864.99),
	(7009, 'A/kadir', 'Awol', 'M', 251, 0),
	(7010, 'Muhammed', 'Seid', 'M', 251, 0),
	(7011, 'Abubeker', 'Ahmed', 'M', 911601174, 39200.03),
	(7012, 'Jafer', 'Abubeker', 'M', 251, 0),
	(7013, 'Nura', 'Issa', 'F', 251, 0),
	(7014, 'Yassin', 'Muhammed', 'M', 251, 14135.009999999995),
	(7015, 'Habtamu', 'A.', 'M', 251, 0),
	(7016, 'Suleman', 'Abdella', 'M', 251, 12135.009999999995),
	(7017, 'Addis', 'Mekonen', 'M', 251, -5864.99),
	(7018, 'Adill', 'Hussien', 'M', 251, 9265.019999999993),
	(7019, 'Adem', 'Jibril', 'M', 251, 22135.009999999995),
	(7020, 'Anwar', 'Hamid', 'M', 251, 42135.009999999995),
	(7021, 'Hadiya', 'Berihun', 'F', 251, 2135.01),
	(7022, 'Hayat', 'Nuruhussien', 'F', 251, 6135.009999999995),
	(7023, 'Dessie', 'Mekonen', 'M', 251, 0),
	(7024, 'Medina', 'Ali', 'F', 251, 0),
	(7025, 'Adem', 'Muhammed', 'M', 251, 0),
	(7026, 'Ahmed', 'Ali', 'M', 251, 135.01000000000022);

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
	('G-155', 10000, 0, b'1', 1034, 7011),
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

CREATE TABLE IF NOT EXISTS `tenants` (
  `tenant_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` char(1) NOT NULL,
  `phone` int(11) NOT NULL DEFAULT 251,
  `active` bit(1) NOT NULL,
  PRIMARY KEY (`tenant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1035 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
	(1033, 'Zeyineb', 'Muhammed', 'F', 251, b'1'),
	(1034, 'Mulu', 'Abdre', 'F', 936684258, b'1');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
