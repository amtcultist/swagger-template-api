export default {
  port: process.env.PORT ?? '3000',
  host: process.env.HOST ?? 'localhost',
  dbUri: process.env.DBURI ?? '',
};
