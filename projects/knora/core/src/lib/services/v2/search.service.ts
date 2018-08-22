import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { ApiServiceResult } from '../../declarations';

@Injectable({
  providedIn: 'root',
})
export class SearchService extends ApiService {

  /**
     * Perform a fulltext search.
     *
     * @param searchTerm the term to search for.
     * @param offset the offset to be used (for paging, first offset is 0).
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearch(searchTerm: string, offset: number = 0): Observable<ApiServiceResult> {

      if (searchTerm === undefined || searchTerm.length === 0) {
          return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
      }

      return this.httpGet('/v2/search/' + searchTerm + '?offset=' + offset);
  }

  /**
   * Perform a fulltext search count query.
   *
   * @param searchTerm the term to search for.
   * @returns {Observable<ApiServiceResult>}
   */
  doFulltextSearchCountQuery(searchTerm: string): Observable<ApiServiceResult> {

      if (searchTerm === undefined || searchTerm.length === 0) {
          return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
      }

      return this.httpGet('/v2/search/count/' + searchTerm);
  }

  /**
   * Perform an extended search.
   *
   * @param sparqlString the Sparql query string to be sent to Knora.
   * @returns {Observable<any>}
   */
  doExtendedSearch(sparqlString: string): Observable<ApiServiceResult> {

      if (sparqlString === undefined || sparqlString.length === 0) {
          return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
      }

      return this.httpGet('/v2/searchextended/' + encodeURIComponent(sparqlString));

  }

  /**
   * Perform an extended search count query.
   *
   * @param sparqlString the Sparql query string to be sent to Knora.
   * @returns {Observable<ApiServiceResult>}
   */
  doExtendedSearchCountQuery(sparqlString: string): Observable<ApiServiceResult> {

      if (sparqlString === undefined || sparqlString.length === 0) {
          return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
      }

      return this.httpGet('/v2/searchextended/count/' + encodeURIComponent(sparqlString));

  }

  /**
   * Perform a search by a resource's rdfs:label.
   *
   * @param {string} searchTerm the term to search for.
   * @param resourceClassIRI restrict search to given resource class.
   * @param projectIri restrict search to given project.
   * @returns {Observable<ApiServiceResult>}
   */
  searchByLabel(searchTerm: string, resourceClassIRI?: string, projectIri?: string): Observable<ApiServiceResult> {

      if (searchTerm === undefined || searchTerm.length === 0) {
          return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
      }

      const params = {};

      if (resourceClassIRI !== undefined) {
          params['limitToResourceClass'] = resourceClassIRI;
      }

      if (projectIri !== undefined) {
          params['limitToProject'] = projectIri;
      }

      // httpGet() expects only one argument, not 2
      // return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), {params: params});
      return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm));

  }
}