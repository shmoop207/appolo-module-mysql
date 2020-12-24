"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {ILogger} from "@appolo/logger";
import {IOptions} from "../index";
import mysql = require('mysql2/promise');


@define()
@singleton()
@factory()
export class MysqlClient implements IFactory<mysql.Connection> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IOptions;

    public async get(): Promise<mysql.Connection> {

        try {
            let conn = await mysql.createConnection(this.moduleOptions.config || this.moduleOptions.connection);

            conn.on('error', (err) => {
                this.logger.error("memsql connection error" + err.toString());
                process.exit(1);
            });

            conn.on('end', (err) => {
                this.logger.error("memsql connection end" + err.toString());
                process.exit(1);
            });

            await conn.connect();

            this.logger.info(`connected to mysql ${this.moduleOptions.id}`);

            return conn;


        } catch (e) {

            this.logger.error(`failed to connect to mysql ${this.moduleOptions.id}`, {err: e.toString()});

            throw e;
        }


    }
}
