"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Number of connections allowed in the pool
    queueLimit: 0,
});
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield pool.getConnection();
    }
    catch (error) {
        console.log("database connection failed", error);
        process.exit(1);
    }
});
exports.getConnection = getConnection;
// will create tables of user and flashCard
(() => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, exports.getConnection)();
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
    yield connection.query(createFlashCardTable);
    //  await connection.query(createUsersTable);
}))();
