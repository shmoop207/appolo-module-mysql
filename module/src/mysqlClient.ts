"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {ILogger} from "@appolo/logger";
import mysql = require('mysql2');
import {IOptions} from "./IOptions";
import {Promises} from "@appolo/utils";


@define()
@singleton()
@factory()
export class MysqlClient implements IFactory<mysql.Connection> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IOptions;

    public async get(): Promise<mysql.Connection> {

        try {
            let conn =  mysql.createConnection(this.moduleOptions.config || this.moduleOptions.connection as any);

            conn.on('error', (err) => {
                this.logger.error("memsql connection error" + err.toString());
                process.exit(1);
            });

            conn.on('end', (err) => {
                this.logger.error("memsql connection end" + err.toString());
                process.exit(1);
            });

            await conn.promise().connect();

            this.logger.info(`connected to mysql ${this.moduleOptions.id}`);

            return conn;


        } catch (e) {

            this.logger.error(`failed to connect to mysql ${this.moduleOptions.id}`, {err: e.toString()});

            throw e;
        }


    }
}
