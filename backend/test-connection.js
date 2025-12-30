const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing MySQL connection...');
  
  // Parse DATABASE_URL
  const dbUrl = process.env.DATABASE_URL;
  console.log('Database URL:', dbUrl);
  
  if (!dbUrl) {
    console.error('❌ DATABASE_URL not found in .env file');
    return;
  }
  
  try {
    // Extract connection details from URL
    const url = new URL(dbUrl);
    const config = {
      host: url.hostname,
      port: url.port || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading slash
    };
    
    console.log('Connection config:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      password: config.password ? '***' : '(no password)'
    });
    
    // Test connection without database first
    const connectionWithoutDB = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
    });
    
    console.log('✅ MySQL server connection successful');
    
    // Create database if it doesn't exist
    await connectionWithoutDB.execute(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
    console.log(`✅ Database '${config.database}' created/verified`);
    
    await connectionWithoutDB.end();
    
    // Test connection with database
    const connection = await mysql.createConnection(config);
    console.log('✅ Database connection successful');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query test successful:', rows[0]);
    
    await connection.end();
    console.log('🎉 All tests passed! Your MySQL setup is working.');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Suggestions:');
      console.log('1. Check your MySQL username and password');
      console.log('2. Try connecting with: mysql -u root -p');
      console.log('3. Update DATABASE_URL in .env with correct credentials');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Suggestions:');
      console.log('1. Make sure MySQL is running: brew services start mysql');
      console.log('2. Check if MySQL is installed: brew install mysql');
    }
  }
}

testConnection();