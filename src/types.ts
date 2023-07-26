import { HttpErrors, ResponseObject } from "@loopback/rest";

/**
 * OpenAPI response for csv
 */
export const CSV_RESPONSE: ResponseObject = {
    description: 'Ping Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'CsvResponse',
                properties: {
                    csvData: { type: 'array' },
                },
            },
        },
    },
};
/**
 * OpenAPI response for error
 */
export const ERROR_RESPONSE: ResponseObject = {
    description: 'Ping Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'CsvResponse',
                properties: {
                    "error": {
                        type: 'object',
                        properties: {
                            "statusCode": { type: 'integer' },
                            "name": { type: 'string' },
                            "message": { type: 'string' },
                        }
                    }
                },
            },
        },
    },
};

export const latestVersionMutualFundsAPI = "/v3/mutual-funds";


export type Filter = { page?: number, limit?: number };

export const validateFilter = (filter: Filter) => {
    if (filter.page && filter.page <= 0) {
        throw HttpErrors[400]('Page should be greater than 0.');
    }
    if (filter.limit && filter.limit <= 0) {
        throw HttpErrors[400]('Limit should be greater than 0.');
    }
}