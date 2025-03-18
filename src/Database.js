const pg = require('pg')

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
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
    console.log('demo()');

    
    // Use a try-catch block to handle async errors
    try {
        // Connect to the database
        const client = await pool.connect();
        
        // Perform the query using async/await
        const result = await client.query('SELECT * FROM Book LIMIT 10');
        
        // Log the result
        console.log(result.rows);
        
        // Release the client after the query is finished
        client.release();
    } catch (err) {
        // Catch and log any errors that occur
        console.error('Error executing query', err.stack);
    }
}


/*
function demo () {
    console.log('demo()');
    const pool = new pg.Pool(config);
    const client = pool.connect();
    client.query('SELECT * FROM Book LIMIT 10');
    //client.release();
}*/



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