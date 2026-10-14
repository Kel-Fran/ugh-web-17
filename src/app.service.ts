import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { IPainting } from './types/IPainting.js';

const msqlc = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'festmenyek'

});

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async paintingsCnt() {
        const [rs, fld] = await msqlc.execute('SELECT COUNT(id) AS cnt FROM festmenyek');
        return (rs as any)[0].cnt as number;
    }

    async paintingsList(ymin: number) {
        const [results] = await msqlc.execute(`SELECT id, title, painter, painted_at FROM festmenyek WHERE painted_at >= ?`, [ymin]);
        return results as IPainting[];

    }

    async newPainting(pnt: Omit<IPainting, 'id'>) {
        const [results] = await msqlc.execute('INSERT INTO festmenyek (title, painter, painted_at) VALUES (?,?,?)', [pnt.title, pnt.painter, pnt.painted_at])
        return {...pnt, id: (results as any).insertId as number} satisfies IPainting;

    }
}
