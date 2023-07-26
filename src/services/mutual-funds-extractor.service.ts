
import { BindingScope, bind } from '@loopback/core';
import csv from 'csvtojson';
import { Filter, validateFilter } from '../types';

@bind({ scope: BindingScope.TRANSIENT })
export class MutualFundsExtractorService {
    async extract(filter: Filter) {
        validateFilter(filter);
        const data = await csv().fromFile("/usr/src/app/scheme-master.csv");
        if(filter.page){
            if(filter.limit){
                return data.slice((filter.page-1)* filter.limit, filter.page-1 * filter.limit);
            }
            return data.slice((filter.page-1));
        } 
        return data;
    }
}
