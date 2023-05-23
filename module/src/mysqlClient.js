"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlClient = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const mysql = require("mysql2");
const url_1 = require("url");
let MysqlClient = class MysqlClient {
    async get() {
        try {
            let config;
            let isPool;
            if (this.moduleOptions.connection) {
                config = this._parseUrl(this.moduleOptions.connection);
            }
            if (this.moduleOptions.config) {
                config = Object.assign({}, config, this.moduleOptions.config);
            }
            if (this.moduleOptions.pool) {
                config = Object.assign({}, config, this.moduleOptions.pool);
                isPool = true;
            }
            if (!config) {
                throw new Error("failed to get mysql config");
            }
            if (isPool) {
                let conn = mysql.createPool(config);
                conn.on('error', (err) => {
                    this.logger.error("memsql connection error" + err.toString());
                    process.exit(1);
                });
                conn.on('end', (err) => {
                    this.logger.error("memsql connection end" + err.toString());
                    process.exit(1);
                });
                let connTest = await conn.promise().getConnection();
                connTest.release();
                this.logger.info(`connected to mysql ${this.moduleOptions.id}`);
                return conn;
            }
            else {
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
            }
        }
        catch (e) {
            this.logger.error(`failed to connect to mysql ${this.moduleOptions.id}`, { err: e.toString() });
            throw e;
        }
    }
    _parseUrl(url) {
        const parsedUrl = new url_1.URL(url);
        const options = {
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
            }
            catch (err) {
                // Otherwise assume it is a plain string
                options[key] = value;
            }
        });
        return options;
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)()
], MysqlClient.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], MysqlClient.prototype, "moduleOptions", void 0);
MysqlClient = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)(),
    (0, inject_1.factory)()
], MysqlClient);
exports.MysqlClient = MysqlClient;
//# sourceMappingURL=mysqlClient.js.map