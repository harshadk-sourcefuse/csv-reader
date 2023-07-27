import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
  response,
  ResponseObject,
  OperationObject,
} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

const apiDescription: OperationObject = {
  tags: ["ping"],
  summary: "ping api",
  description: "Ping api",
  responses: {
    "200": PING_RESPONSE
  },
  "x-codeSamples": [
    {
      lang: "curl",
      source: "curl --location 'https://ksensei-api.sourcef.us/kfintech/ping?api-key=<INSERT_YOUR_API_KEY>'"
    }, {
      lang: "JavaScript",
      source: "var urlencoded = new URLSearchParams();\n\nvar requestOptions = {\n  method: 'GET',\n  body: urlencoded,\n  redirect: 'follow'\n};\n\nfetch('https://ksensei-api.sourcef.us/kfintech/ping?api-key=<INSERT_YOUR_API_KEY>', requestOptions)\n  .then(response => response.text())\n  .then(result => console.log(result))\n  .catch(error => console.log('error', error));"
    }, {
      lang: "Node.js",
      source: "const axios = require('axios');\nconst qs = require('qs');\nlet data = qs.stringify({\n   \n});\n\nlet config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: 'https://ksensei-api.sourcef.us/kfintech/ping?api-key=<INSERT_YOUR_API_KEY>',\n  headers: { },\n  data : data\n};\n\naxios.request(config)\n.then((response) => {\n  console.log(JSON.stringify(response.data));\n})\n.catch((error) => {\n  console.log(error);\n});\n"
    }
  ]
};
/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @get('/ping', apiDescription)
  @response(200, PING_RESPONSE)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
