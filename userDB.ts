import sqlite3 from 'sqlite3'
import { rejects } from 'assert'
import { resolve } from 'path'
import { emitKeypressEvents } from 'readline'
const sqlite: sqlite3.sqlite3 = sqlite3.verbose()

//users (user_id INT PRIMARY KEY, username TEXT, password TEXT)

const sqlGetUser = `
        SELECT user_id FROM users  
        WHERE username = ? AND password = ?
    `
export function prGetUser(username: string, password: string): Promise<number> {
    return new Promise((resolve, rejects) => {
        const db = new sqlite.Database('base.db')
        db.get(sqlGetUser, [username, password], (err, row) => {
            if (err)
                rejects(err)
            if (row)
                resolve(row.user_id)
            resolve(-1)
        })
        db.close()

    })
}
