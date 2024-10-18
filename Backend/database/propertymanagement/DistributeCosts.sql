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

-- Dumping structure for procedure propertymanagement.DistributeCosts
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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
