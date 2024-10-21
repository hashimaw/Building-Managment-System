import express from 'express';
import bodyparser from "body-parser";
import pool from "./database.js";
import cors from 'cors';
import moment  from 'moment';
import { add } from 'date-fns';

const app = express()
const port = process.env.port || 4000
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
app.listen (port,()=>{
    console.log (`server is running on port: ${port}`)
});

function CalculateExpiration (dateStr, durationInMO) {
    // Create a Date object from the input string
    const dateObj = new Date(dateStr);
  
    // Add 30 days to the date
    dateObj.setDate(dateObj.getDate() + (durationInMO * 30));
  
    // Format the date as desired (e.g., YYYY-MM-DD)
    const formattedDate = dateObj.toISOString().split('T')[0];
  
    return formattedDate;
  }

  const bigIntReplacer = (key, value) => {
    return typeof value === 'bigint' ? value.toString() : value;
  };

const executeGetQuerys = async (sql, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(sql);
      res.send(JSON.stringify(result, bigIntReplacer));
      console.log(result);
      conn.end();
    } catch (err) {
      res.status(500).send('Internal Server Error');
      throw err;
    } finally {
      if (conn) conn.end(); // Properly close the connection
    }
  };

  const executeAddQuerys = async (sql, res) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const result = await conn.query(sql);
        res.status(200).json({ message: 'Data inserted successfully'})
        conn.end();
    }catch(err){
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
        throw err;
    }finally {
        if (conn) conn.end(); // Properly close the connection
      }
  };

app.get("/tenants", async (req, res) => {

        const gettenantsql = `SELECT 
    t.tenant_id,
    t.first_name,
    t.last_name,
    t.gender,
    t.phone,
    t.active,
    s.shop_id,
    s.price,
    i.invoice_id,
    i.tenant_id AS invotena_id,
    i.shop_id AS invoshop_id,
    i.date_from,
    i.date_to,
    DATEDIFF(date_to, CURRENT_DATE) AS remaining_days,
    i.active AS invo_active
FROM 
    tenants t
LEFT JOIN 
    shops s ON t.tenant_id = s.tenant_id
LEFT JOIN 
    (SELECT invoice_id, tenant_id, shop_id, date_from, date_to, active,
             RANK() OVER (PARTITION BY shop_id ORDER BY date_to DESC) as rk
     FROM invoices) i ON s.shop_id = i.shop_id AND i.rk = 1
     ORDER BY remaining_days ASC;`;
 
    executeGetQuerys(gettenantsql, res);
  
});

app.get("/shops", async (req, res) => {
   
        const getshopssql = `SELECT 
    s.shop_id,
    s.price,
    s.rented,
    DATEDIFF(date_to, CURRENT_DATE) AS remaining_days,
    sh.shareholder_id,
    sh.first_name AS holder_first_name,
    sh.last_name AS holder_last_name,
    t.tenant_id,
    t.first_name AS tenant_first_name,
    t.last_name AS tenant_last_name,
    i.invoice_id,
    i.date_to
FROM 
    shops s
LEFT JOIN 
    shareholders sh ON s.shareholder_id = sh.shareholder_id
LEFT JOIN 
    tenants t ON s.tenant_id = t.tenant_id
LEFT JOIN 
    (SELECT invoice_id, shop_id, date_to, 
             RANK() OVER (PARTITION BY shop_id ORDER BY date_to DESC) as rk
     FROM invoices) i ON s.shop_id = i.shop_id AND i.rk = 1
     ORDER BY remaining_days ASC;
`;
    executeGetQuerys(getshopssql,res);
});

app.get("/unrentedshops", async (req, res) => {
   
    const getunrentedshopssql = "SELECT shop_id, price, rented FROM shops WHERE rented = 0;";
    executeGetQuerys(getunrentedshopssql,res);
});

app.get("/shareholders", async (req, res) => {
    
    const getshareholderssql = `SELECT 
    shareholders.shareholder_id,
    shareholders.first_name,
    shareholders.last_name,
    shareholders.gender,
    shareholders.balance,
    shareholders.phone,
    CAST(COUNT(shops.shop_id) AS INT) AS number_of_shops,
    GROUP_CONCAT(shops.shop_id SEPARATOR ', ') AS shop_ids,
    GROUP_CONCAT(CASE WHEN shops.rented = 1 THEN shops.shop_id ELSE NULL END SEPARATOR ', ') AS rented_shop_ids 
FROM 
    shareholders 
LEFT JOIN 
    shops 
ON 
    shareholders.shareholder_id = shops.shareholder_id 
GROUP BY 
    shareholders.shareholder_id 
ORDER BY 
    number_of_shops DESC;
`;
    executeGetQuerys(getshareholderssql, res);
});

app.get("/getshareholders", async (req, res) => {

    const getshareholdessmallsql = "SELECT shareholder_id, first_name, last_name FROM shareholders";
    executeGetQuerys(getshareholdessmallsql, res);

});

app.post("/addshop", async (req, res) => {
    console.log(req.body)

    const addshopssql = `INSERT INTO shops (shop_id, price, floor, shareholder_id) VALUES ('${req.body.shop_id}', '${req.body.price}', '${req.body.floor}', '${req.body.shareholder_id}');`;
    executeAddQuerys(addshopssql, res);
});

app.post("/updateshopprice", async (req, res) => {
    console.log(req.body)

    const updateshoppricesql = `UPDATE shops SET price = ${req.body.price} WHERE shop_id = ${req.body.shop_id}`;
    executeAddQuerys(updateshoppricesql, res);
});

app.post("/changeshareholder", async (req, res) => {
    console.log(req.body)

    const changeshareholdersql = `UPDATE shops SET shareholder_id = ${req.body.shareholder_id} WHERE shop_id = '${req.body.shop_id}'`;
    executeAddQuerys(changeshareholdersql, res);
});

app.post("/editshopid", async (req, res) => {
    console.log(req.body)
    
    const editshopidsql = `UPDATE shops SET shop_id = '${req.body.newShopId}' WHERE shop_id = '${req.body.shop_id}'`;
    executeAddQuerys(editshopidsql, res);  
});

app.post("/addshareholder", async (req, res) => {
    console.log(req.body)
    
    const addshareholdersql = `INSERT INTO shareholders (first_name, last_name, gender, phone, balance) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.gender}', '${req.body.phone}', '0');`;
    executeAddQuerys(addshareholdersql, res);  
});

app.post("/withdraw", async (req, res) => {
    console.log(req.body)
    const shareholder_id = req.body.shareholder_id;
    const withdrawing = req.body.withdrawing;
    const sqltogetamount = `SELECT balance FROM shareholders WHERE shareholder_id = ${shareholder_id}`;
    var currentAmount = 0;
    let conn;
    try {
        conn = await pool.getConnection()
        const result = await conn.query(sqltogetamount)
        console.log(result)
        currentAmount = result[0].balance
        conn.end();
    } catch (error) {
        throw error
    } finally {
        if(conn) conn.end();
    }

    if(currentAmount >= withdrawing){
        console.log(currentAmount , withdrawing)

        try{
            conn = await pool.getConnection()
            const sql = `UPDATE shareholders SET balance = ${currentAmount-withdrawing} WHERE shareholder_id = ${req.body.shareholder_id}`;
            const result = await conn.query(sql);
            res.status(200).json({ message: 'Data inserted successfully'})
            conn.end();
        }catch(err){
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to insert data' });
            throw err;
        }finally {
            if(conn) conn.end();
        }
    }

    
})

app.post("/editshareholder", async (req, res) => {
    console.log(req.body)

    const editshareholdersql = `update shareholders set first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', gender = '${req.body.gender}', phone = '${req.body.phone}' WHERE shareholder_id = ${req.body.shareholder_id};`;
    executeAddQuerys(editshareholdersql, res);
})

app.post("/addtenant", async (req, res) => {
    console.log(req.body)

    const addtenantsql = `INSERT INTO tenants (first_name, last_name, gender, phone, active) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.gender}', '${req.body.phone}', 0);`;
    executeAddQuerys(addtenantsql, res);
});

app.post("/edittenant", async (req, res) => {
    console.log(req.body)
    
    const edittenantsql = `update tenants set first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', gender = '${req.body.gender}', phone = '${req.body.phone}' WHERE tenant_id = ${req.body.tenant_id};`;
    executeAddQuerys(edittenantsql, res);
});

app.post("/leaseshop", async (req, res) => {
    console.log(req.body)
    const tenant_id = req.body.tenant_id;
    const shop_id = req.body.shop_id;
    const date_from = req.body.start_date;
    const duration = req.body.duration;
    const date_to = CalculateExpiration(date_from, duration)
    const today = moment().format('YYYY-MM-DD');
    const active = date_to >= today;
    let conn;
    
    const indicateorInTenant = `update tenants set active = true where tenant_id = ${tenant_id}`
    const establishLeaseInShopsTable = `update shops set tenant_id = '${req.body.tenant_id}', rented = 1 WHERE shop_id = '${req.body.shop_id}';`;
    const createInvoice = `INSERT INTO invoices (tenant_id, shop_id, shareholder_id, date_from, date_to, duration, shop_price, active) SELECT ${tenant_id}, s.shop_id, s.shareholder_id, '${date_from}', '${date_to}', ${duration}, s.price, ${active} FROM shops s WHERE s.shop_id = '${shop_id}';`;
    const addbalancetoshareholder = `UPDATE shareholders sh JOIN shops s ON sh.shareholder_id = s.shareholder_id SET sh.balance = sh.balance + (s.price * ${duration}) WHERE s.shop_id = '${shop_id}'`
    
    try{
        conn = await pool.getConnection();
        
        const result1 = await conn.query(indicateorInTenant);
        const result2 = await conn.query(establishLeaseInShopsTable);
        const result3 = await conn.query(createInvoice);
        const result4 = await conn.query(addbalancetoshareholder);
        res.status(200).json({ message: 'Data inserted successfully'})
        conn.end();
    }catch(err){
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
        throw err;
    }finally {
        if(conn) conn.end();
    }
})

app.post("/extendlease", async (req, res) => {
    console.log(req.body)
    const shop_id = req.body.shop_id;
    var result=[];
    let conn;
    try{
        conn = await pool.getConnection();
        const extendleasesql = `SELECT * FROM invoices WHERE shop_id = '${shop_id}' ORDER BY date_to DESC LIMIT 1;`;
        result = await conn.query(extendleasesql);
       console.log(result);
       res.status(200).json({})
       conn.end();
    }catch(err){
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
        throw err;
    }finally {
        if(conn) conn.end();
    }

    const date_from = moment(result[0].date_to).format('YYYY-MM-DD');
    const tenant_id = result[0].tenant_id;
    const duration = req.body.duration;
    const date_to = CalculateExpiration(date_from, duration)
    const today = moment().format('YYYY-MM-DD');
    const active = date_to >= today;

    try{
        conn = await pool.getConnection();
        const addbalancetoshareholder = `UPDATE shareholders sh JOIN shops s ON sh.shareholder_id = s.shareholder_id SET sh.balance = sh.balance + (s.price * ${duration}) WHERE s.shop_id = '${shop_id}'`
        const createInvoice = `INSERT INTO invoices (tenant_id, shop_id, shareholder_id, date_from, date_to, duration, shop_price, active) SELECT ${tenant_id}, s.shop_id, s.shareholder_id, '${date_from}', '${date_to}', ${duration}, s.price, ${active} FROM shops s WHERE s.shop_id = '${shop_id}';`;
        const result1 = await conn.query(createInvoice);
        const result2 = await conn.query(addbalancetoshareholder);
        res.status(200).json({ message: 'Data inserted successfully'})
        conn.end();
    }catch(err){
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
        throw err;
    }finally {
        if(conn) conn.end();
    }
});

app.post("/terminate", async (req, res) => {
    console.log(req.body)

    const indicatorofffromtenant = `UPDATE tenants t JOIN shops s ON t.tenant_id = s.tenant_id SET t.active = FALSE, s.tenant_id= NULL, s.rented = 0 WHERE s.shop_id = '${req.body.shop_id}'`
    executeAddQuerys(indicatorofffromtenant, res);
})

app.get("/get/:shop_id", async (req, res) => {
    const shop_id = req.params.shop_id

    const getShopByIdsql = `SELECT * FROM invoices WHERE shop_id = '${shop_id}' ORDER BY date_to DESC LIMIT 1;`;
    executeGetQuerys(getShopByIdsql, res);
})

app.post("/addemployee", async (req, res) => {
    console.log(req.body)

    const addemployeesql = `INSERT INTO employees (first_name, last_name, gender, position, phone, salary, employment_date) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.gender}', '${req.body.position}', '${req.body.phone}', ${req.body.salary}, '${req.body.employment_date}');`;
    executeAddQuerys(addemployeesql, res);
})

app.get("/employees", async (req, res) => {
    console.log(req.body)

    const getemployeessql = `select e.employee_id, e.first_name, e.last_name, e.gender, e.position, e.phone, e.salary, e.employment_date, ei.date_to, DATEDIFF(date_to, CURRENT_DATE) AS remaining_days from employees e left join employeeinvoice ei ON e.employee_id = ei.employee_id; `;
    executeGetQuerys(getemployeessql, res);
})

app.post("/editemployee", async (req, res) => {
    console.log(req.body)

    const editemployeesql = `update employees set first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', gender = '${req.body.gender}', phone = '${req.body.phone}', position = '${req.body.position}', salary = ${req.body.salary}, employment_date ='${req.body.employment_date}' WHERE employee_id = ${req.body.employee_id};`;
    executeAddQuerys(editemployeesql, res);
});

app.post("/payemployee", async (req, res) => {
    console.log(req.body)
    const employee_id = req.body.employee_id;
    var employee=[];
    var invoice=[];
    var conn;
    try{
        conn = await pool.getConnection()
        const invoicesql = `SELECT * FROM employeeinvoice WHERE employee_id = '${employee_id}' ORDER BY date_to DESC LIMIT 1;`;
        const employeesql = `select * from employees where employee_id = '${employee_id}'`
        invoice = await conn.query(invoicesql);
       console.log(invoice);
       employee = await conn.query(employeesql);
       console.log(employee)
       conn.end();
    }catch(err){
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
        throw err;
    }finally {
        if(conn) conn.end();
    }

    const date_from = invoice[0] ? moment(invoice[0].date_to).format('YYYY-MM-DD'): moment(employee[0].employment_date).format('YYYY-MM-DD');
    const duration = req.body.duration;
    const date_to = CalculateExpiration(date_from, duration);
    const salary = employee[0].salary;
   
    try{
        conn = await pool.getConnection()
        const createInvoicesql = `INSERT INTO employeeinvoice (employee_id, date_from, date_to, salary, duration_month, distributed ) VALUES ('${employee_id}', '${date_from}', '${date_to}', ${salary}, ${duration}, 0);`;
        const result1 = await conn.query(createInvoicesql);
        res.status(200).json({ message: 'Data inserted successfully'})
        conn.end();
    }catch(err){
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
        throw err;
    }finally {
        if(conn) conn.end();
    }
});

app.post("/addcost", async (req, res) => {
    console.log(req.body)

    const addcostsql = `INSERT INTO costs (name, type, price, description, date, status, distributed) VALUES ('${req.body.name}', '${req.body.type}', ${req.body.price}, "${req.body.description}", '${req.body.date}', '${req.body.status}', 0);`;
    executeAddQuerys(addcostsql, res);
})

app.post("/editcost", async (req, res) => {
    console.log(req.body)

    const editcostsql = `update costs SET name = '${req.body.name}', type = '${req.body.type}', price = ${req.body.price}, description = "${req.body.description}", status = '${req.body.status}', date = '${req.body.date}' WHERE cost_id = ${req.body.cost_id};`;
    executeAddQuerys(editcostsql, sql);
})

app.get("/costs", async (req, res) => {
    console.log(req.body)

    const getcostssql = `select * from costs `;
    executeGetQuerys(getcostssql, res);
})

app.post("/distcost", async (req, res) => {
    console.log(req.body)

    const distitsql = `CALL DistributeCosts(${req.body.cost_id});`;
    executeAddQuerys(distitsql, res);
})
