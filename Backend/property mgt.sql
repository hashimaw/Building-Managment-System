CREATE TABLE `Tenants` (
    `tenant_id` int  NOT NULL ,
    `first_name` varchar(50)  NOT NULL ,
    `last_name` varchar(50)  NOT NULL ,
    `gender` char  NOT NULL ,
    `phone` int  NOT NULL ,
    `start_date` datetime  NOT NULL ,
    `last_payment_month` date  NOT NULL ,
    `active` bit  NOT NULL ,
    PRIMARY KEY (
        `tenant_id`
    )
);

CREATE TABLE `invoices` (
    `invoice_id` int  NOT NULL ,
    `tenant_id` int  NOT NULL ,
    `date_from` date  NOT NULL ,
    `date_to` date  NOT NULL ,
    `status` boolean  NOT NULL ,
    `date_created` datetime  NOT NULL ,
    PRIMARY KEY (
        `invoice_id`
    )
);

CREATE TABLE `shops` (
    `shop_id` int  NOT NULL ,
    `price` int  NOT NULL ,
    `floor` int  NOT NULL ,
    `rented` bit  NOT NULL ,
    `tenant_id` int  NOT NULL ,
    `shareholder_id` int  NOT NULL ,
    PRIMARY KEY (
        `shop_id`
    )
);

CREATE TABLE `shareholders` (
    `shareholder_id` int  NOT NULL ,
    `first_name` varchar(50)  NOT NULL ,
    `last_name` varchar(50)  NOT NULL ,
    `gender` char  NOT NULL ,
    `phone` int  NOT NULL ,
    `shops_id` list  NOT NULL ,
    `balance` int  NOT NULL ,
    PRIMARY KEY (
        `shareholder_id`
    )
);

ALTER TABLE `invoices` ADD CONSTRAINT `fk_invoices_tenant_id` FOREIGN KEY(`tenant_id`)
REFERENCES `Tenants` (`tenant_id`);

ALTER TABLE `shops` ADD CONSTRAINT `fk_shops_tenant_id` FOREIGN KEY(`tenant_id`)
REFERENCES `Tenants` (`tenant_id`);

ALTER TABLE `shops` ADD CONSTRAINT `fk_shops_shareholder_id` FOREIGN KEY(`shareholder_id`)
REFERENCES `shareholders` (`shareholder_id`);



CREATE TABLE Tenants (
    TenantID INT PRIMARY KEY,
    Name VARCHAR(100),
    ContactInfo VARCHAR(255),
    RentalStartDate DATE
);

CREATE TABLE Shareholders (
    ShareholderID INT PRIMARY KEY,
    Name VARCHAR(100),
    ContactInfo VARCHAR(255)
);

CREATE TABLE Shops (
    ShopID INT PRIMARY KEY,
    ShopNumber VARCHAR(20),
    SquareFootage DECIMAL(10, 2),
    RentAmount DECIMAL(10, 2),
    ShareholderID INT,
    FOREIGN KEY (ShareholderID) REFERENCES Shareholders(ShareholderID)
);

CREATE TABLE Income (
    IncomeID INT PRIMARY KEY,
    ShopID INT,
    RentalIncome DECIMAL(10, 2),
    ReceivedDate DATE,
    FOREIGN KEY (ShopID) REFERENCES Shops(ShopID)
);

CREATE TABLE Expenses (
    ExpenseID INT PRIMARY KEY,
    Description VARCHAR(255),
    Amount DECIMAL(10, 2),
    IncurredDate DATE
);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    Name VARCHAR(100),
    Role VARCHAR(50),
    Wage DECIMAL(10, 2)
);

CREATE TABLE Payroll (
    PayrollID INT PRIMARY KEY,
    EmployeeID INT,
    WageAmount DECIMAL(10, 2),
    PaymentDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
