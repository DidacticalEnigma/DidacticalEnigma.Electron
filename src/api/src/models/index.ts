/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ServiceClientOptions } from "@azure/ms-rest-js";
import * as msRest from "@azure/ms-rest-js";

/**
 * An interface representing DataSourceInformation.
 */
export interface DataSourceInformation {
  identifier: string;
}

/**
 * An interface representing DataSourceParseRequest.
 */
export interface DataSourceParseRequest {
  requestedDataSources?: string[];
  id?: string;
  position?: number;
}

/**
 * An interface representing DataSourceParseResponse.
 */
export interface DataSourceParseResponse {
  context?: string;
  error?: string;
}

/**
 * An interface representing KanjiLookupResult.
 */
export interface KanjiLookupResult {
  kanji: string[];
  possibleRadicals: string[];
}

/**
 * An interface representing WordInfo.
 */
export interface WordInfo {
  text: string;
  dictionaryForm: string;
  reading: string;
}

/**
 * An interface representing WordInfoResponse.
 */
export interface WordInfoResponse {
  wordInformation: WordInfo[][];
  identifier: string;
}

/**
 * An interface representing DidacticalEnigmaRestApiOptions.
 */
export interface DidacticalEnigmaRestApiOptions extends ServiceClientOptions {
  baseUri?: string;
}

/**
 * Optional Parameters.
 */
export interface DidacticalEnigmaRestApiRequestInformationFromDataSourcesOptionalParams extends msRest.RequestOptionsBase {
  body?: DataSourceParseRequest;
}

/**
 * Optional Parameters.
 */
export interface DidacticalEnigmaRestApiSelectRadicalsOptionalParams extends msRest.RequestOptionsBase {
  radical?: string;
}

/**
 * Optional Parameters.
 */
export interface DidacticalEnigmaRestApiGetWordInformationOptionalParams extends msRest.RequestOptionsBase {
  fullText?: string;
}

/**
 * Optional Parameters.
 */
export interface DidacticalEnigmaRestApiPostTextOptionalParams extends msRest.RequestOptionsBase {
  fullText?: string;
}

/**
 * Optional Parameters.
 */
export interface DidacticalEnigmaRestApiDeleteTextOptionalParams extends msRest.RequestOptionsBase {
  identifier?: string;
}

/**
 * Contains response data for the listDataSources operation.
 */
export type ListDataSourcesResponse = Array<DataSourceInformation> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: DataSourceInformation[];
    };
};

/**
 * Contains response data for the requestInformationFromDataSources operation.
 */
export type RequestInformationFromDataSourcesResponse = {
  /**
   * The response body properties.
   */
  [propertyName: string]: DataSourceParseResponse;
} & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: { [propertyName: string]: DataSourceParseResponse };
    };
};

/**
 * Contains response data for the listRadicals operation.
 */
export type ListRadicalsResponse = Array<string> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: string[];
    };
};

/**
 * Contains response data for the selectRadicals operation.
 */
export type SelectRadicalsResponse = KanjiLookupResult & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: KanjiLookupResult;
    };
};

/**
 * Contains response data for the getWordInformation operation.
 */
export type GetWordInformationResponse = Array<WordInfo[]> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: WordInfo[][];
    };
};

/**
 * Contains response data for the postText operation.
 */
export type PostTextResponse = WordInfoResponse & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: WordInfoResponse;
    };
};
