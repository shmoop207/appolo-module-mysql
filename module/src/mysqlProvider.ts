import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {
    Connection,
    FieldPacket,
    OkPacket,
    QueryOptions,
    ResultSetHeader,
    RowDataPacket,
    Query,
    QueryError
} from "mysql2";

@define()
@singleton()
export class MysqlProvider {
    @inject() private mysqlClient: Connection;

    public get client(): Connection {
        return this.mysqlClient;
    }

    public query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
        sql: string | QueryOptions,
        values?: any | any[] | { [param: string]: any }
    ): Promise<[T, FieldPacket[]]> {
        return this.mysqlClient.promise().query(sql as string, values)
    }

    public queryStream<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
        sql: string | QueryOptions,
        values?: any | any[] | { [param: string]: any },
        callback?: (err: QueryError | null, result: T, fields: FieldPacket[]) => any
    ): Query {
        return this.mysqlClient.query(sql as string, values, callback)
    }
}
