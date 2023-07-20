import { inject, service } from '@loopback/core';
import {
  Request,
  Response,
  RestBindings,
  get,
  oas,
  response
} from '@loopback/rest';
import { CSV_RESPONSE, latestVersionMutualFundsAPI } from '../../types';
import { MutualFundsExtractorService } from '../../services';

/**
 * A simple controller to bounce back http requests
 */
export class MutualFundsControllerV2 {
  constructor(
    @service(MutualFundsExtractorService)
    private readonly mutualFundsExtractorService: MutualFundsExtractorService,
    @inject(RestBindings.Http.RESPONSE)
    private readonly response: Response,
    @inject(RestBindings.Http.REQUEST)
    private readonly request: Request,) { }

  // Map to `GET /ping`
  @get('/v2/mutual-funds')
  @response(299, CSV_RESPONSE)
  @oas.deprecated(true)
  async ping(): Promise<object> {
    const url = `${this.request.protocol}://${this.request.headers.host}${latestVersionMutualFundsAPI}`;
    this.response.status(299).setHeader("Location", url).send({
      mutualFundsData: await this.mutualFundsExtractorService.extract()
    });
    return this.response;
  }
}
