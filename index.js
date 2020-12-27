"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlModule = exports.MysqlProvider = void 0;
exports.mysql = require("mysql2/promise");
var mysqlProvider_1 = require("./module/src/mysqlProvider");
Object.defineProperty(exports, "MysqlProvider", { enumerable: true, get: function () { return mysqlProvider_1.MysqlProvider; } });
var mySqlModule_1 = require("./module/mySqlModule");
Object.defineProperty(exports, "MySqlModule", { enumerable: true, get: function () { return mySqlModule_1.MySqlModule; } });
//# sourceMappingURL=index.js.map