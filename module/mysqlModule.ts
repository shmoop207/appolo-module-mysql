import {IModuleParams, Module, module} from "@appolo/engine";
import {MysqlClient} from "./src/mysqlClient";
import {MysqlProvider} from "./src/mysqlProvider";
import {IOptions} from "./src/IOptions";

@module()
export class MySqlModule extends Module<IOptions> {

    public get defaults(): Partial<IOptions> {
        return {
            id: "mysqlConn",
        }
    }

    public static for(options: IOptions): IModuleParams {
        return {type: MySqlModule, options}
    }

    public get exports() {
        return [{id: this.moduleOptions.id, type: MysqlProvider}];
    }
}
