const {
  db_postgres_mutantsdb_user: USER,
  db_postgres_mutantsdb_password: PASSWORD,
  db_postgres_mutantsdb_name: DB_NAME,
  db_postgres_mutantsdb_host: HOST,
  db_postgres_mutantsdb_port: PORT,
} = process.env;
module.exports = {
  type: 'postgres',
  host: HOST,
  port: parseInt(PORT),
  username: USER,
  password: PASSWORD,
  database: DB_NAME,
  logger: 'advanced-console',
  cache: true,
  logging: 'all',
  synchronize: false,
  dropSchema: false,
  entities: ['dist/database/models/**/*.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  migrationsTableName: 'migration',
  cli: {
    entitiesDir: 'src/database/models',
    migrationsDir: 'src/database/migrations',
  },
};
