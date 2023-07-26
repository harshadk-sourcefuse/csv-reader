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
import { CSV_RESPONSE, ERROR_RESPONSE, Filter, latestVersionMutualFundsAPI } from '../../types';

const apiDescription: OperationObject = {
  tags: ["mutual-funds"],
  summary: "version 1 API of mutual funds",
  description: "Mutual funds v1",
  responses: {
    "299": CSV_RESPONSE,
    "400": ERROR_RESPONSE
  }
};
const res :ResponsesObject={};
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
  async ping(@param.query.object('filter') filter: Filter): Promise<object> {
    const url = `${this.request.protocol}://${this.request.headers.host}${latestVersionMutualFundsAPI}`;
    this.response.status(299).setHeader("Location", url).send({
      mutualFundsData: await this.mutualFundsExtractorService.extract(filter)
    });
    return this.response;
  }
}
