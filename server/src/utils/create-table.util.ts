// Create database
import { client } from "../configs/db.config";

export async function createTable(
  tableName: string,
  fieldsAndTypes: { [key: string]: string }
) {
  try {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${Object.keys(
      fieldsAndTypes
    ).map((field) => `${field} ${fieldsAndTypes[field]}`)})`;

    await client.query(query);

    console.log(`Successfully created table: ${tableName}`);
  } catch (err) {
    console.log(err);
  }
}
