import dotenv from "dotenv";

dotenv.config();

const config = {
  serviceName: process.env.SERVICENAME || 'nodejs-typescript',
  port: Number(process.env.PORT) || 3000,
  loggerLevel: 'debug',
  db: {
      user: process.env.REPLICATION_DB_USER || '',
      database: process.env.REPLICATION_DB || '',
      password: process.env.REPLICATION_DB_PASS || '',
      host: process.env.REPLICATION_DB_IP || '',
      port: Number(process.env.REPLICATION_DB_PORT) || 5432,
      max: Number(process.env.DB_MAX_CLIENTS) || 20,
      idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000
  }
}

export = config;