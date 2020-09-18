import { DidacticalEnigmaRestApiModels } from "../api/src/didacticalEnigmaRestApi";
import { DidacticalEnigmaRestApi } from "../api/src/didacticalEnigmaRestApi";
//import { MockDidacticalEnigmaApi } from "./mockApi";

export interface DidacticalEnigmaApi {
    listDataSources(): Promise<DidacticalEnigmaRestApiModels.ListDataSourcesResponse>;
    listRadicals(): Promise<DidacticalEnigmaRestApiModels.ListRadicalsResponse>;
    requestInformationFromDataSources(options: DidacticalEnigmaRestApiModels.DidacticalEnigmaRestApiRequestInformationFromDataSourcesOptionalParams): Promise<DidacticalEnigmaRestApiModels.RequestInformationFromDataSourcesResponse>;
    selectRadicals(options: DidacticalEnigmaRestApiModels.DidacticalEnigmaRestApiSelectRadicalsOptionalParams): Promise<DidacticalEnigmaRestApiModels.SelectRadicalsResponse>;
    getWordInformation(options: DidacticalEnigmaRestApiModels.DidacticalEnigmaRestApiGetWordInformationOptionalParams): Promise<DidacticalEnigmaRestApiModels.GetWordInformationResponse>;
    postText(options: DidacticalEnigmaRestApiModels.DidacticalEnigmaRestApiPostTextOptionalParams): Promise<DidacticalEnigmaRestApiModels.PostTextResponse>;
    deleteText(options: DidacticalEnigmaRestApiModels.DidacticalEnigmaRestApiDeleteTextOptionalParams): Promise<unknown>;
}

export const api : DidacticalEnigmaApi = new DidacticalEnigmaRestApi({ baseUri: "http://localhost:5000" });
//export const api : DidacticalEnigmaApi = new MockDidacticalEnigmaApi;