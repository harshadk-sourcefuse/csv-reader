import { ResponseObject } from "@loopback/rest";

/**
 * OpenAPI response for ping()
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

export const latestVersionMutualFundsAPI =  "/v3/mutual-funds";
