const pg = require('pg')

// create a config to configure both pooling behavior and client options
var config = {
    user: 'postgres', // env var: PGUSER
    database: 'db03', // env var: PGDATABASE
    password: 'Database0305!', // env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

// Create the pool and connect to the database
const pool = new pg.Pool(config);


async function tamir1() {
    console.log('Database.Tamir1()');
    // Use a try-catch block to handle async errors
    try {
        // Connect to the database
        const client = await pool.connect();
        // Perform the query using async/await
        const result = await client.query('SELECT * FROM Book LIMIT 10');
        // Release the client after the query is finished
        client.release();
        // Log the result
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        // Catch and log any errors that occur
        console.error('Database.Tamir1() -> Error executing query', error.stack);
    }
}









async function query (q) {
    console.log('query() ' + q)

    const client = await pool.connect()
    console.log('connect()')

    let res
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res.rows;
}

async function main (queryStr) {
    try {
        const { rows } = await query(queryStr);
        return rows;
    } catch (err) {
        console.log('Database ' + err)
        return null;
    }
}
//main('SELECT * FROM user where user = \'123\'')
//main('SELECT * FROM Book LIMIT 10')

module.exports = { tamir1, main };
