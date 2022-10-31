import chai = require('chai');
import {App, createApp} from '@appolo/engine';
import {LoggerModule} from '@appolo/logger';
import {MySqlModule} from "../module/mysqlModule";
import {MysqlProvider} from "../module/src/mysqlProvider";

let should = require('chai').should();


describe("mysql module", function () {
    let app: App;

    before(async () => {

        app = await createApp({
            environment: 'testing',
            paths: ['src', 'test/mocks'],
        })

        await app.module.load(LoggerModule)

        app.module.use(MySqlModule.for({
            pool: {connectionLimit: 10},
            connection: process.env.Conn
        }))

        await app.launch()

    });

    afterEach(async () => {
        await app.reset()
    });


    describe("connect", () => {

        it('try connect', async () => {
            let provider = app.injector.get<MysqlProvider>("mysqlConn");

            provider.should.be.ok;
        });
    });

});
