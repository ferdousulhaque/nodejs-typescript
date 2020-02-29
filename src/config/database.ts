import dotenv from "dotenv";

dotenv.config();

module.exports = {
  'host' : process.env.REPLICATION_DB_IP,
  'port' : process.env.REPLICATION_DB_PORT,
  'database' : process.env.REPLICATION_DB,
  'user' : process.env.REPLICATION_DB_USER,
  'password' : process.env.REPLICATION_DB_PASS
};