import { inject } from '@loopback/core';
import {
  OperationObject,
  Request,
  RestBindings,
  get,
  response,
} from '@loopback/rest';
const health_response = {
  description: 'Health Response',
  content: {
    "text/plain": {
      schema: {
        type: "string",
        example: "Service is up"
      }
    }
  }
}
const apiDescription: OperationObject = {
  tags: ["health"],
  summary: "health check api response with 200 http status if service is running",
  description: "Health check api",
  responses: {
    "200": health_response
  },
  "x-codeSamples": [
    {
      lang: "curl",
      source: "curl --location 'https://ksensei-api.sourcef.us/kfintech/health?api-key=<INSERT_YOUR_API_KEY>'"
    }, {
      lang: "JavaScript",
      source: "var urlencoded = new URLSearchParams();\n\nvar requestOptions = {\n  method: 'GET',\n  body: urlencoded,\n  redirect: 'follow'\n};\n\nfetch('https://ksensei-api.sourcef.us/kfintech/health?api-key=<INSERT_YOUR_API_KEY>', requestOptions)\n  .then(response => response.text())\n  .then(result => console.log(result))\n  .catch(error => console.log('error', error));"
    }, {
      lang: "Node.js",
      source: "const axios = require('axios');\nconst qs = require('qs');\nlet data = qs.stringify({\n   \n});\n\nlet config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: 'https://ksensei-api.sourcef.us/kfintech/health?api-key=<INSERT_YOUR_API_KEY>',\n  headers: { },\n  data : data\n};\n\naxios.request(config)\n.then((response) => {\n  console.log(JSON.stringify(response.data));\n})\n.catch((error) => {\n  console.log(error);\n});\n"
    }
  ]
};
/**
 * A simple controller to bounce back http requests
 */
export class HealthController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }
  // Map to `GET /health`
  @get('/health', apiDescription)
  @response(200, health_response)
  health(): string {
    return "Service is up";
  }
}
