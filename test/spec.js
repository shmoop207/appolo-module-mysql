"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("@appolo/engine");
const logger_1 = require("@appolo/logger");
const mysqlModule_1 = require("../module/mysqlModule");
let should = require('chai').should();
describe("mysql module", function () {
    let app;
    before(async () => {
        app = await (0, engine_1.createApp)({
            environment: 'testing',
            paths: ['src', 'test/mocks'],
        });
        await app.module.load(logger_1.LoggerModule);
        app.module.use(mysqlModule_1.MySqlModule.for({
            pool: { connectionLimit: 10 },
            connection: process.env.Conn
        }));
        await app.launch();
    });
    afterEach(async () => {
        await app.reset();
    });
    describe("connect", () => {
        it('try connect', async () => {
            let provider = app.injector.get("mysqlConn");
            provider.should.be.ok;
        });
    });
});
//# sourceMappingURL=spec.js.map