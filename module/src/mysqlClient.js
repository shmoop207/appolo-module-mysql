"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlClient = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const mysql = require("mysql2/promise");
let MysqlClient = class MysqlClient {
    async get() {
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
        }
        catch (e) {
            this.logger.error(`failed to connect to mysql ${this.moduleOptions.id}`, { err: e.toString() });
            throw e;
        }
    }
};
tslib_1.__decorate([
    inject_1.inject()
], MysqlClient.prototype, "logger", void 0);
tslib_1.__decorate([
    inject_1.inject()
], MysqlClient.prototype, "moduleOptions", void 0);
MysqlClient = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.factory()
], MysqlClient);
exports.MysqlClient = MysqlClient;
//# sourceMappingURL=mysqlClient.js.map