import { join } from "lodash";
import { api } from "./api"

export class RadicalLookup {
    public async getRadicals() {
        return await api.listRadicals();
    }

    public async selectRadicals(radicals: Array<string>) {
        return await api.selectRadicals({
            radical: join(radicals, ",")
        });
    }
}