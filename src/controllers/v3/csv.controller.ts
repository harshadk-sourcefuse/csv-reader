import { inject, service } from '@loopback/core';
import {
  Response,
  RestBindings,
  get,
  response
} from '@loopback/rest';
import { CsvExtractorService } from '../../services';
import { CSV_RESPONSE } from '../../types';

/**
 * A simple controller to bounce back http requests
 */
export class CsvControllerV3 {
  constructor(
    @service(CsvExtractorService)
    private readonly csvExtractorService: CsvExtractorService,
    @inject(RestBindings.Http.RESPONSE)
    private readonly response: Response,) { }

  // Map to `GET /ping`
  @get('/v3/csv')
  @response(200, CSV_RESPONSE)
  async ping(): Promise<object> {
    this.response.status(200).send({
      csvData: await this.csvExtractorService.extract()
    });
    return this.response;
  }
}
