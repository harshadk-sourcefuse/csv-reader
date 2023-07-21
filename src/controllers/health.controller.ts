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
  }
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
