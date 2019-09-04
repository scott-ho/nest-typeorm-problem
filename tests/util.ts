import { createConnection, getConnectionOptions } from 'typeorm';

/**
 * create a connection
 */
export async function createTypeormConn() {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: 'default' });
}
