"use strict";
import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {ILogger} from "@appolo/logger";
import mysql = require('mysql2');
import {IOptions} from "./IOptions";
import {Promises} from "@appolo/utils";
import {URL} from "url";
import {ConnectionOptions} from "mysql2";


@define()
@singleton()
@factory()
export class MysqlClient implements IFactory<mysql.Connection> {

    @inject() logger: ILogger;
    @inject() moduleOptions: IOptions;

    public async get(): Promise<mysql.Connection> {

        try {

            let config: ConnectionOptions;

            if (this.moduleOptions.connection) {
                config = this._parseUrl(this.moduleOptions.connection);
            }

            if (this.moduleOptions.config) {
                config = this.moduleOptions.config;
            }

            if (!config) {
                throw new Error("failed to get mysql config")
            }

            let conn = mysql.createConnection(config);

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

    private _parseUrl(url: string): ConnectionOptions {
        const parsedUrl = new URL(url);
        const options: ConnectionOptions = {
            host: parsedUrl.hostname,
            port: parseInt(parsedUrl.port),
            database: parsedUrl.pathname.substr(1),
            user: decodeURI(parsedUrl.username),
            password: decodeURI(parsedUrl.password)
        };
        parsedUrl.searchParams.forEach((value, key) => {
            try {
                // Try to parse this as a JSON expression first
                options[key] = JSON.parse(value);
            } catch (err) {
                // Otherwise assume it is a plain string
                options[key] = value;
            }
        });
        return options;
    }
}
