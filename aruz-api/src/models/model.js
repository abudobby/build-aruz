import { pool } from '../../config/database.js';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    console.log(query)
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }

  async updateWithReturn(rsvp, inviteCode) {
    const query = `UPDATE ${this.table} SET going = ${rsvp}, rsvp = false, authenticated = false WHERE invite_code = '${inviteCode}' RETURNING *`;
    return this.pool.query(query);
  }
}

export default Model;