
import { BindingScope, bind } from '@loopback/core';
import csv from 'csvtojson';
import { validateFilter } from '../types';

@bind({ scope: BindingScope.TRANSIENT })
export class MutualFundsExtractorService {
    async extract(page?: number, limit?: number) {
        validateFilter(page, limit);
        const data = await csv().fromFile("/usr/src/app/scheme-master.csv");
        if (page) {
            if (limit) {
                return data.slice((page - 1) * limit, page * limit);
            }
            return data.slice((page - 1));
        }
        return data;
    }
}
