require('dotenv').config();
const pg = require('pg')

// configuration for connection string, using an env file to store the following variables
var config = {
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    max: process.env.PGMAX || 10,
    idleTimeoutMillis: process.env.PGIDLETIMEOUT || 30000
};

// Create the pool and connect to the database
const pool = new pg.Pool(config);

async function runQuery(query) {
    console.log('Database.runQuery()');
    // Use a try-catch block to handle async errors
    try {
        // Connect to the database
        const client = await pool.connect();
        // Perform the query using async/await
        const result = await client.query(query);
        // Release the client after the query is finished
        client.release();
        // Log the result
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        // Catch and log any errors that occur
        console.error('Database.runQuery() -> Error executing query', error.stack);
    }
}

//List API
//Retrieve all products depending on the category
async function retrieveProductsByCategory(category) {
    console.log('Database.retrieveProductsByCategory() -> Fetching: ${category}');

    const query = `
        SELECT ProductSKU, ProductName, Price, InventoryLevel
        FROM Product
        WHERE Category = '${category}'
        ORDER BY ProductName;
    `;

    return runQuery(query);
}

//Complex Query API
//The total number of sales for each product from the SaleItem table.
//The latest sale date for each product.
async function retrieveTotalSalesForEachProduct(category) {
    console.log('Database.retrieveTotalSalesForEachProduct() -> Fetching: ${category}');
    
    const query = `
        SELECT 
            P.ProductSKU, 
            P.ProductName, 
            P.Price, 
            P.InventoryLevel,
            -- Sub-select to get total units sold from SaleItem
            (SELECT COALESCE(SUM(SI.UnitsSold), 0) 
            FROM SaleItem SI 
            WHERE SI.ProductSKU = P.ProductSKU) AS TotalUnitsSold,
            -- Sub-select to get the latest sale date
            (SELECT MAX(SI.SaleDate) 
            FROM SaleItem SI 
            WHERE SI.ProductSKU = P.ProductSKU) AS LastSaleDate
        FROM Product P
        WHERE P.Category = '${category}'
        ORDER BY P.ProductName
    `;

    return runQuery(query);
}

module.exports = { retrieveProductsByCategory, retrieveTotalSalesForEachProduct };
