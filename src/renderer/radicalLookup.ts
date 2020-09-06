import { api } from "./api"

export class RadicalLookup {
    public async getRadicals() {
        return await api.listRadicals();
    }

    public async selectRadicals(radicals: string) {
        return await api.selectRadicals({
            query: radicals
        });
    }
}