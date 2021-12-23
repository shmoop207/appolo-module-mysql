"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlProvider = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
let MysqlProvider = class MysqlProvider {
    get client() {
        return this.mysqlClient;
    }
    query(sql, values) {
        return this.mysqlClient.promise().query(sql, values);
    }
    queryStream(sql, values, callback) {
        return this.mysqlClient.query(sql, values, callback);
    }
    createQuery(sql, values, callback) {
        return this.mysqlClient.query(sql, values, callback);
    }
    beginTransaction() {
        return this.mysqlClient.promise().beginTransaction();
    }
    commit() {
        return this.mysqlClient.promise().commit();
    }
    rollback() {
        return this.mysqlClient.promise().rollback();
    }
};
(0, tslib_1.__decorate)([
    (0, inject_1.inject)()
], MysqlProvider.prototype, "mysqlClient", void 0);
MysqlProvider = (0, tslib_1.__decorate)([
    (0, inject_1.define)(),
    (0, inject_1.singleton)()
], MysqlProvider);
exports.MysqlProvider = MysqlProvider;
//# sourceMappingURL=mysqlProvider.js.map