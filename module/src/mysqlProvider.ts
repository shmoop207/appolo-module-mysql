import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {Promises} from '@appolo/utils';
import {
    Connection,
    FieldPacket,
    QueryOptions,
    RowDataPacket,
    Query,
    QueryError
} from "mysql2";
import {OkPacket} from "./interfaces";

@define()
@singleton()
export class MysqlProvider {
    @inject() private mysqlClient: Connection;

    public get client(): Connection {
        return this.mysqlClient;
    }

    public query<T extends { [index: string]: any }>(
        sql: string | QueryOptions,
        values?: any | any[] | { [param: string]: any }
    ): Promise<[T[], FieldPacket[]]> {
        return this.mysqlClient.promise().query<any>(sql as string, values)
    }

    public queryStream<T extends { [index: string]: any }>(
        sql: string | QueryOptions,
        values?: any | any[] | { [param: string]: any },
        callback?: (err: QueryError | null, result: T, fields: FieldPacket[]) => any
    ): Query {
        return this.mysqlClient.query<any>(sql as string, values, callback)
    }

    public createQuery<T extends { [index: string]: any }>(
        sql: string | QueryOptions,
        values?: any | any[] | { [param: string]: any },
        callback?: (err: QueryError | null, result: T, fields: FieldPacket[]) => any
    ): Query {
        return this.mysqlClient.query<any>(sql as string, values, callback)
    }

    public beginTransaction() {
        return this.mysqlClient.promise().beginTransaction()
    }

    public commit() {
        return this.mysqlClient.promise().commit()
    }

    public rollback() {
        return this.mysqlClient.promise().rollback()
    }
}
