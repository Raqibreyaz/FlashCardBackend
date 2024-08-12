import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Number of connections allowed in the pool
  queueLimit: 0,
});

export const getConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.log("database connection failed",error);
    process.exit(1);
  }
};

// will create tables of user and flashCard
(async () => {
  const connection = await getConnection();

  // Create the users table
  // const createUsersTable = `
  //   CREATE TABLE IF NOT EXISTS users (
  //     id INT AUTO_INCREMENT PRIMARY KEY,
  //     email VARCHAR(100) NOT NULL UNIQUE,
  //     password VARCHAR(20) NOT NULL
  //   )
  // `;

  // Create the flash table
  const createFlashCardTable = `
CREATE TABLE IF NOT EXISTS flashCard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT,
  answer TEXT
)
`;

  await connection.query(createFlashCardTable);
  //  await connection.query(createUsersTable);
})();
