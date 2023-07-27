import { inject, service } from '@loopback/core';
import {
  OperationObject,
  Request,
  Response,
  ResponsesObject,
  RestBindings,
  get,
  oas,
  param,
  response
} from '@loopback/rest';
import { MutualFundsExtractorService } from '../../services';
import { CSV_RESPONSE, ERROR_RESPONSE, latestVersionMutualFundsAPI } from '../../types';

const apiDescription: OperationObject = {
  tags: ["mutual-funds"],
  summary: "version 1 API of mutual funds",
  description: "Mutual funds v1",
  responses: {
    "299": CSV_RESPONSE,
    "400": ERROR_RESPONSE
  },
  "x-codeSamples": [
    {
      lang: "curl",
      source: "curl --location 'https://ksensei-api.sourcef.us/kfintech/v1/mutual-funds?page=1&limit=1&api-key=<INSERT_YOUR_API_KEY>'"
    }, {
      lang: "JavaScript",
      source: "var urlencoded = new URLSearchParams();\n\nvar requestOptions = {\n  method: 'GET',\n  body: urlencoded,\n  redirect: 'follow'\n};\n\nfetch('https://ksensei-api.sourcef.us/kfintech/v1/mutual-funds?page=1&limit=1&api-key=<INSERT_YOUR_API_KEY>', requestOptions)\n  .then(response => response.text())\n  .then(result => console.log(result))\n  .catch(error => console.log('error', error));"
    }, {
      lang: "Node.js",
      source: "const axios = require('axios');\nconst qs = require('qs');\nlet data = qs.stringify({\n   \n});\n\nlet config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: 'https://ksensei-api.sourcef.us/kfintech/v1/mutual-funds?page=1&limit=1&api-key=<INSERT_YOUR_API_KEY>',\n  headers: { },\n  data : data\n};\n\naxios.request(config)\n.then((response) => {\n  console.log(JSON.stringify(response.data));\n})\n.catch((error) => {\n  console.log(error);\n});\n"
    }
  ]
};
const res: ResponsesObject = {};
/**
 * A simple controller to bounce back http requests
 */
export class MutualFundsControllerV1 {
  constructor(
    @service(MutualFundsExtractorService)
    private readonly mutualFundsExtractorService: MutualFundsExtractorService,
    @inject(RestBindings.Http.RESPONSE)
    private readonly response: Response,
    @inject(RestBindings.Http.REQUEST)
    private readonly request: Request,) { }

  // Map to `GET /ping`
  @get('/v1/mutual-funds', apiDescription)
  @response(299, CSV_RESPONSE)
  @oas.deprecated(true)
  async ping(
    @param.query.number('page') page?: number,
    @param.query.number('limit') limit?: number
  ): Promise<object> {
    const url = `${this.request.protocol}://${this.request.headers.host}${latestVersionMutualFundsAPI}`;
    this.response.status(299).setHeader("Location", url).send({
      mutualFundsData: await this.mutualFundsExtractorService.extract(page, limit)
    });
    return this.response;
  }
}
