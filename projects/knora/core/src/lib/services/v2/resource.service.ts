import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { ApiServiceResult, ReadResourcesSequence } from '../../declarations';
import { map, mergeMap } from 'rxjs/operators';
import { ConvertJSONLD } from './convert-jsonld';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld');

@Injectable({
    providedIn: 'root'
})
export class ResourceService extends ApiService {

    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param iri Iri of the resource (already URL encoded).
     * @returns {Observable<any>}
     */

    getResource(iri): Observable<ReadResourcesSequence> {
        // console.log('IRI from resource service: ', iri);
        const res: Observable<any> = this.httpGet('/v2/resources/' + encodeURIComponent(iri));

        return res.pipe(
            mergeMap(
                // this would return an Observable of a PromiseObservable -> combine them into one Observable
                // http://reactivex.io/documentation/operators/flatmap.html
                // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
                (resourceResponse: ApiServiceResult) => {
                    const resPromises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    const resPromise = resPromises.compact(resourceResponse.body, {});

                    // convert promise to Observable and return it
                    // https://www.learnrxjs.io/operators/creation/frompromise.html
                    return from(resPromise);
                }
            ),
            map(
                (resourceResponse: Object) => {
                    const resSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
                    return resSeq;
                }
            )
        );
    }

    /*
    // TODO: we should use the ApiService correctly. But right now it doesn't work
    getResource(iri): Observable<ReadResource> {
        return this.httpGet('/v2/resources/' + encodeURIComponent(iri)).pipe(
            map((result: ApiServiceResult) => result.getBody(ReadResource)),
            catchError(this.handleJsonError)
        );
    }
    */

    // TODO: post, put, delete
}
