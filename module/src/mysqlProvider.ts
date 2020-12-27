import {define, factory, IFactory, inject, singleton} from '@appolo/inject';
import {Connection, FieldPacket, OkPacket, QueryOptions, ResultSetHeader, RowDataPacket} from "mysql2/promise";

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
        return this.mysqlClient.query(sql as string, values)
    }
}
