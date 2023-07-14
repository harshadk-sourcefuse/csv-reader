import { inject, service } from '@loopback/core';
import {
  Response,
  RestBindings,
  get,
  oas,
  response
} from '@loopback/rest';
import { CSV_RESPONSE } from '../../types';
import { MutualFundsExtractorService } from '../../services';

/**
 * A simple controller to bounce back http requests
 */
export class MutualFundsControllerV1 {
  constructor(
    @service(MutualFundsExtractorService)
    private readonly mutualFundsExtractorService: MutualFundsExtractorService,
    @inject(RestBindings.Http.RESPONSE)
    private readonly response: Response,) { }

  // Map to `GET /ping`
  @get('/v1/mutual-funds')
  @response(299, CSV_RESPONSE)
  @oas.deprecated(true)
  async ping(): Promise<object> {
    this.response.status(299).send({
      mutualFundsData: await this.mutualFundsExtractorService.extract()
    });
    return this.response;
  }
}
