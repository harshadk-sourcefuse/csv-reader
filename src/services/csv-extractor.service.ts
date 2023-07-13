
import { BindingScope, bind } from '@loopback/core';
import csv from 'csvtojson';

@bind({ scope: BindingScope.TRANSIENT })
export class CsvExtractorService {
    async extract() {
        return await csv().fromFile("/Users/harshad.kadam/Desktop/kong/csv-reader/marvel.csv");
    }
}
