const pg = require('pg')

// create a config to configure both pooling behavior and client options
var config = {
    user: 'postgres', // env var: PGUSER
    database: 'dbfinal', // env var: PGDATABASE
    password: 'Database0305!', // env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

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

async function tamir1(category) {
    console.log(`Database.tamir1() -> Fetching products in category: ${category}`);

    const query = `
        SELECT ProductSKU, ProductName, Price, InventoryLevel
        FROM Product
        WHERE Category = '${category}'
        ORDER BY ProductName
        LIMIT 10 OFFSET 0;
    `;

    return runQuery(query);
}


async function tamir2() {
    console.log('Database.tamir2()');
    const query = 'SELECT * FROM users';
    return runQuery(query);
}



module.exports = { tamir1, tamir2 };
