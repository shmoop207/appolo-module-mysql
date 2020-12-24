"use strict";
var MySqlModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const mysqlClient_1 = require("./src/mysqlClient");
exports.mysql = require("mysql2/promise");
const mysqlProvider_1 = require("./src/mysqlProvider");
let MySqlModule = MySqlModule_1 = class MySqlModule extends engine_1.Module {
    get defaults() {
        return {
            id: "mysqlConn",
        };
    }
    static for(options) {
        return { type: MySqlModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: mysqlProvider_1.MysqlProvider }];
    }
};
MySqlModule = MySqlModule_1 = tslib_1.__decorate([
    engine_1.module({ exports: [mysqlClient_1.MysqlClient] })
], MySqlModule);
exports.MySqlModule = MySqlModule;
//# sourceMappingURL=index.js.map