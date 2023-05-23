export interface OkPacket {
    fieldCount: number;
    affectedRows: number;
    changedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    procotol41: boolean;
}

export interface ResultSetHeader {
    affectedRows: number;
    fieldCount: number;
    info: string;
    insertId: number;
    serverStatus: number;
    warningStatus: number;
    changedRows?: number;
}