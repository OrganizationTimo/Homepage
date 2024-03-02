import { createTable } from "../utils/create-table.util";
import { client } from "../configs/db.config";
import { QueryResult } from "pg";
export class User {
  constructor() {
    this.createUserModel();
  }

  private async createUserModel() {
    await createTable("users", {
      id: "SERIAL PRIMARY KEY",
      username: "VARCHAR(255)",
      email: "VARCHAR(255)",
      password: "VARCHAR(255)",
      created_at: "TIMESTAMP",
      updated_at: "TIMESTAMP",
    });
  }

  public async findExistingUser(username: string) {
    try {
      const query = `SELECT * FROM users WHERE username = '${username}'`;
      const result: QueryResult = await client.query(query);

      return result.rows[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async insertUser(username: string, email: string, password: string) {
    try {
      const query = `INSERT INTO users (username, email, password, created_at, updated_at) VALUES ('${username}', '${email}', '${password}', NOW(), NOW())`;
      await client.query(query);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
