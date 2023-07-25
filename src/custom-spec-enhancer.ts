import { injectable } from '@loopback/core';
import {
  mergeOpenAPISpec,
  asSpecEnhancer,
  OASEnhancer,
  OpenApiSpec,
} from '@loopback/rest';

/**
 * A spec enhancer to add OpenAPI info spec
 */
@injectable(asSpecEnhancer)
export class CustomSpecEnhancer implements OASEnhancer {
  name = 'introduction';

  async modifySpec(spec: OpenApiSpec): Promise<OpenApiSpec> {
    const InfoPatchSpec = {
      info: {
        description: "<h3>This is a sample server Kfintech API's</h3>.\n\n# Introduction\nThis is the API documentation of Mutual Funds API's provided by kfintech.\nHere to use the API's follow following procedure\n- Visit the home page\n- Select the appropriate plan for your project\n- after confirming and choosing right plan for your project, pay the subscription fees,\nOnce the subscription fees are paid you will recieve the api-key\n- The generated api-key which you can use for accessing the api\n\n# OpenAPI Specification\nThis API is documented in **OpenAPI format**.\n\n# Cross-Origin Resource Sharing\nThis API features Cross-Origin Resource Sharing (CORS) implemented in compliance with  [W3C spec](https://www.w3.org/TR/cors/).\nAnd that allows cross-domain communication from the browser.\nAll responses have a wildcard same-origin which makes them completely public and accessible to everyone, including any code on any site.",
          title: spec.info.title,
          version: spec.info.version
      },
      servers:[{url:"ksensei-api.sourcef.us"}]
    };
    const mergedSpec = mergeOpenAPISpec(spec, InfoPatchSpec);
    return mergedSpec;
  }
}