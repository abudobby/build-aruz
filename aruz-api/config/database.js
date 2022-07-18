//database.js

import _ from 'pg';

const { Pool } = _
export const connectionString = "postgres://eogwxkow:j_MyinYN5vxYW8nxE-B1lGP3WSdH-UNQ@rajje.db.elephantsql.com/eogwxkow"

export const pool = new Pool({ connectionString });
