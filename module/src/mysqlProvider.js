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
        return this.mysqlClient.query(sql, values);
    }
};
tslib_1.__decorate([
    inject_1.inject()
], MysqlProvider.prototype, "mysqlClient", void 0);
MysqlProvider = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], MysqlProvider);
exports.MysqlProvider = MysqlProvider;
//# sourceMappingURL=mysqlProvider.js.map