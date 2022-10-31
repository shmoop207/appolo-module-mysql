import {ConnectionOptions, PoolOptions} from "mysql2";

export interface IOptions {
    connection?: string,
    id?: string,
    config?: ConnectionOptions,
    pool?: PoolOptions
}
