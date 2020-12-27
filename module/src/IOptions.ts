import {ConnectionOptions} from "mysql2";

export interface IOptions {
    connection?: string,
    id?: string,
    config?: ConnectionOptions
}
