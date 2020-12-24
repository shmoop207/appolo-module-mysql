"use strict";
import {Module, module, IModuleParams} from '@appolo/engine';
import {MysqlClient} from "./src/mysqlClient";
import {ConnectionOptions} from "mysql2";

export interface IOptions {
    connection?: string,
    id?: string,
    config?: ConnectionOptions
}

export import mysql = require('mysql2/promise');
import {MysqlProvider} from "./src/mysqlProvider";

@module({exports: [MysqlClient]})
export class MySqlModule extends Module<IOptions> {

    public get defaults(): Partial<IOptions> {
        return {
            id: "mysqlConn",
        }
    }

    public static for(options: IOptions): IModuleParams {
        return {type: MySqlModule, options}
    }

    public get exports() {
        return [{id: this.moduleOptions.id, type: MysqlProvider}];
    }
}
