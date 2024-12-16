USE bm0t76ifuv6qoqbaxtss;
DELIMITER //

CREATE PROCEDURE `DistributeCosts`(IN input_cost_id INT)
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
