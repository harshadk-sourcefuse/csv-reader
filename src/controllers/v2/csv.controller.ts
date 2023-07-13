import { inject, service } from '@loopback/core';
import {
  Response,
  RestBindings,
  get,
  oas,
  response
} from '@loopback/rest';
import { CSV_RESPONSE } from '../../types';
import { CsvExtractorService } from '../../services';

/**
 * A simple controller to bounce back http requests
 */
export class CsvControllerV2 {
  constructor(
    @service(CsvExtractorService)
    private readonly csvExtractorService: CsvExtractorService,
    @inject(RestBindings.Http.RESPONSE)
    private readonly response: Response,) { }

  // Map to `GET /ping`
  @get('/v2/csv')
  @response(302, CSV_RESPONSE)
  @oas.deprecated(true)
  async ping(): Promise<object> {
    this.response.status(302).send({
      csvData: await this.csvExtractorService.extract()
    });
    return this.response;
  }
}
