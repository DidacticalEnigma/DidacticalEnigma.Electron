/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as Parameters from "./models/parameters";
import { DidacticalEnigmaRestApiContext } from "./didacticalEnigmaRestApiContext";

class DidacticalEnigmaRestApi extends DidacticalEnigmaRestApiContext {
  /**
   * Initializes a new instance of the DidacticalEnigmaRestApi class.
   * @param [options] The parameter options
   */
  constructor(options?: Models.DidacticalEnigmaRestApiOptions) {
    super(options);
  }

  /**
   * @param [options] The optional parameters
   * @returns Promise<Models.ListDataSourcesResponse>
   */
  listDataSources(options?: msRest.RequestOptionsBase): Promise<Models.ListDataSourcesResponse>;
  /**
   * @param callback The callback
   */
  listDataSources(callback: msRest.ServiceCallback<Models.DataSourceInformation[]>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listDataSources(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DataSourceInformation[]>): void;
  listDataSources(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DataSourceInformation[]>, callback?: msRest.ServiceCallback<Models.DataSourceInformation[]>): Promise<Models.ListDataSourcesResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      listDataSourcesOperationSpec,
      callback) as Promise<Models.ListDataSourcesResponse>;
  }

  /**
   * @param [options] The optional parameters
   * @returns Promise<Models.RequestInformationFromDataSourcesResponse>
   */
  requestInformationFromDataSources(options?: Models.DidacticalEnigmaRestApiRequestInformationFromDataSourcesOptionalParams): Promise<Models.RequestInformationFromDataSourcesResponse>;
  /**
   * @param callback The callback
   */
  requestInformationFromDataSources(callback: msRest.ServiceCallback<{ [propertyName: string]: Models.DataSourceParseResponse }>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  requestInformationFromDataSources(options: Models.DidacticalEnigmaRestApiRequestInformationFromDataSourcesOptionalParams, callback: msRest.ServiceCallback<{ [propertyName: string]: Models.DataSourceParseResponse }>): void;
  requestInformationFromDataSources(options?: Models.DidacticalEnigmaRestApiRequestInformationFromDataSourcesOptionalParams | msRest.ServiceCallback<{ [propertyName: string]: Models.DataSourceParseResponse }>, callback?: msRest.ServiceCallback<{ [propertyName: string]: Models.DataSourceParseResponse }>): Promise<Models.RequestInformationFromDataSourcesResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      requestInformationFromDataSourcesOperationSpec,
      callback) as Promise<Models.RequestInformationFromDataSourcesResponse>;
  }

  /**
   * @param [options] The optional parameters
   * @returns Promise<Models.ListRadicalsResponse>
   */
  listRadicals(options?: msRest.RequestOptionsBase): Promise<Models.ListRadicalsResponse>;
  /**
   * @param callback The callback
   */
  listRadicals(callback: msRest.ServiceCallback<Models.ListRadicalsResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listRadicals(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ListRadicalsResult>): void;
  listRadicals(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.ListRadicalsResult>, callback?: msRest.ServiceCallback<Models.ListRadicalsResult>): Promise<Models.ListRadicalsResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      listRadicalsOperationSpec,
      callback) as Promise<Models.ListRadicalsResponse>;
  }

  /**
   * @param [options] The optional parameters
   * @returns Promise<Models.SelectRadicalsResponse>
   */
  selectRadicals(options?: Models.DidacticalEnigmaRestApiSelectRadicalsOptionalParams): Promise<Models.SelectRadicalsResponse>;
  /**
   * @param callback The callback
   */
  selectRadicals(callback: msRest.ServiceCallback<Models.KanjiLookupResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  selectRadicals(options: Models.DidacticalEnigmaRestApiSelectRadicalsOptionalParams, callback: msRest.ServiceCallback<Models.KanjiLookupResult>): void;
  selectRadicals(options?: Models.DidacticalEnigmaRestApiSelectRadicalsOptionalParams | msRest.ServiceCallback<Models.KanjiLookupResult>, callback?: msRest.ServiceCallback<Models.KanjiLookupResult>): Promise<Models.SelectRadicalsResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      selectRadicalsOperationSpec,
      callback) as Promise<Models.SelectRadicalsResponse>;
  }

  /**
   * @param [options] The optional parameters
   * @returns Promise<Models.GetWordInformationResponse>
   */
  getWordInformation(options?: Models.DidacticalEnigmaRestApiGetWordInformationOptionalParams): Promise<Models.GetWordInformationResponse>;
  /**
   * @param callback The callback
   */
  getWordInformation(callback: msRest.ServiceCallback<Models.WordInfo[][]>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getWordInformation(options: Models.DidacticalEnigmaRestApiGetWordInformationOptionalParams, callback: msRest.ServiceCallback<Models.WordInfo[][]>): void;
  getWordInformation(options?: Models.DidacticalEnigmaRestApiGetWordInformationOptionalParams | msRest.ServiceCallback<Models.WordInfo[][]>, callback?: msRest.ServiceCallback<Models.WordInfo[][]>): Promise<Models.GetWordInformationResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      getWordInformationOperationSpec,
      callback) as Promise<Models.GetWordInformationResponse>;
  }

  /**
   * @param [options] The optional parameters
   * @returns Promise<Models.PostTextResponse>
   */
  postText(options?: Models.DidacticalEnigmaRestApiPostTextOptionalParams): Promise<Models.PostTextResponse>;
  /**
   * @param callback The callback
   */
  postText(callback: msRest.ServiceCallback<Models.WordInfoResponse>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  postText(options: Models.DidacticalEnigmaRestApiPostTextOptionalParams, callback: msRest.ServiceCallback<Models.WordInfoResponse>): void;
  postText(options?: Models.DidacticalEnigmaRestApiPostTextOptionalParams | msRest.ServiceCallback<Models.WordInfoResponse>, callback?: msRest.ServiceCallback<Models.WordInfoResponse>): Promise<Models.PostTextResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      postTextOperationSpec,
      callback) as Promise<Models.PostTextResponse>;
  }

  /**
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteText(options?: Models.DidacticalEnigmaRestApiDeleteTextOptionalParams): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  deleteText(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteText(options: Models.DidacticalEnigmaRestApiDeleteTextOptionalParams, callback: msRest.ServiceCallback<void>): void;
  deleteText(options?: Models.DidacticalEnigmaRestApiDeleteTextOptionalParams | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      deleteTextOperationSpec,
      callback);
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listDataSourcesOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "dataSource/list",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DataSourceInformation"
            }
          }
        }
      }
    },
    default: {}
  },
  serializer
};

const requestInformationFromDataSourcesOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "dataSource/request",
  requestBody: {
    parameterPath: [
      "options",
      "body"
    ],
    mapper: Mappers.DataSourceParseRequest
  },
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "Composite",
              className: "DataSourceParseResponse"
            }
          }
        }
      }
    },
    default: {}
  },
  serializer
};

const listRadicalsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "radicals/list",
  responses: {
    200: {
      bodyMapper: Mappers.ListRadicalsResult
    },
    default: {}
  },
  serializer
};

const selectRadicalsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "radicals/select",
  queryParameters: [
    Parameters.query,
    Parameters.sort
  ],
  responses: {
    200: {
      bodyMapper: Mappers.KanjiLookupResult
    },
    default: {}
  },
  serializer
};

const getWordInformationOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "wordInfo",
  queryParameters: [
    Parameters.fullText
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "WordInfo"
                }
              }
            }
          }
        }
      }
    },
    default: {}
  },
  serializer
};

const postTextOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "wordInfo",
  queryParameters: [
    Parameters.fullText
  ],
  responses: {
    200: {
      bodyMapper: Mappers.WordInfoResponse
    },
    default: {}
  },
  serializer
};

const deleteTextOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "wordInfo",
  queryParameters: [
    Parameters.identifier
  ],
  responses: {
    200: {},
    default: {}
  },
  serializer
};

export {
  DidacticalEnigmaRestApi,
  DidacticalEnigmaRestApiContext,
  Models as DidacticalEnigmaRestApiModels,
  Mappers as DidacticalEnigmaRestApiMappers
};
