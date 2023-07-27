import { inject, service } from '@loopback/core';
import {
  OperationObject,
  Response,
  RestBindings,
  get,
  param,
  response
} from '@loopback/rest';
import { MutualFundsExtractorService } from '../../services';
import { CSV_RESPONSE, ERROR_RESPONSE } from '../../types';

const apiDescription: OperationObject = {
  tags: ["mutual-funds"],
  summary: "version 3 API of mutual funds",
  description: "Mutual funds v3",
  responses: {
    "200": CSV_RESPONSE,
    "400": ERROR_RESPONSE
  },
  "x-codeSamples": [
    {
      lang: "curl",
      source: "curl --location 'https://ksensei-api.sourcef.us/kfintech/v3/mutual-funds?page=1&limit=1&api-key=<INSERT_YOUR_API_KEY>'"
    }, {
      lang: "JavaScript",
      source: "var urlencoded = new URLSearchParams();\n\nvar requestOptions = {\n  method: 'GET',\n  body: urlencoded,\n  redirect: 'follow'\n};\n\nfetch('https://ksensei-api.sourcef.us/kfintech/v3/mutual-funds?page=1&limit=1&api-key=<INSERT_YOUR_API_KEY>', requestOptions)\n  .then(response => response.text())\n  .then(result => console.log(result))\n  .catch(error => console.log('error', error));"
    }, {
      lang: "Node.js",
      source: "const axios = require('axios');\nconst qs = require('qs');\nlet data = qs.stringify({\n   \n});\n\nlet config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: 'https://ksensei-api.sourcef.us/kfintech/v3/mutual-funds?page=1&limit=1&api-key=<INSERT_YOUR_API_KEY>',\n  headers: { },\n  data : data\n};\n\naxios.request(config)\n.then((response) => {\n  console.log(JSON.stringify(response.data));\n})\n.catch((error) => {\n  console.log(error);\n});\n"
    }
  ]
};
/**
 * A simple controller to bounce back http requests
 */
export class MutualFundsControllerV3 {
  constructor(
    @service(MutualFundsExtractorService)
    private readonly mutualFundsExtractorService: MutualFundsExtractorService,
    @inject(RestBindings.Http.RESPONSE)
    private readonly response: Response,) { }

  // Map to `GET /ping`
  @get('/v3/mutual-funds', apiDescription)
  @response(200, CSV_RESPONSE)
  async ping(
    @param.query.number('page') page?: number,
    @param.query.number('limit') limit?: number
  ): Promise<object> {
    this.response.status(200).send({
      mutualFundsData: await this.mutualFundsExtractorService.extract(page, limit)
    });
    return this.response;
  }
}
