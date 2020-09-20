import { api } from "./api"

export class DataSourceLookup {
    public async listDataSources() {
        return await api.listDataSources();
    }

    public async lookup(textIdentifier: string, position: number, dataSourceIdentifiers: string[]) {
        return await api.requestInformationFromDataSources({
            body: {
                id: textIdentifier,
                position: position,
                requestedDataSources: dataSourceIdentifiers
            }
        });
    }
}