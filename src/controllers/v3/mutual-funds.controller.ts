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
  }
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
