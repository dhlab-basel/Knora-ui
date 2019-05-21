import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatListModule, MatTabsModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KuiCoreConfig, KuiCoreConfigToken, SearchService, ExtendedSearchParams, SearchParamsService, CountQueryResult, ConvertJSONLD, ResourceClasses, Properties, OntologyInformation, FulltextSearchParams } from '@knora/core';
import { SearchResultsComponent } from './search-results.component';
import { ListViewComponent } from '../list-view/list-view.component';
import { GridViewComponent } from '../grid-view/grid-view.component';
import { TableViewComponent } from '../table-view/table-view.component';
import { GraphViewComponent } from '../graph-view/graph-view.component';
import { TextValueAsHtmlComponent } from '../../property/text-value/text-value-as-html/text-value-as-html.component';
import { DateValueComponent } from '../../property/date-value/date-value.component';
import { of, BehaviorSubject } from 'rxjs';
import { KuiActionModule } from 'projects/knora/action/src/public_api';

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    const mode = 'extended';
    const q = 'test';

    let mockSearchParamService;
    let searchServiceSpy: jasmine.SpyObj<SearchService>; // see https://angular.io/guide/testing#angular-testbed

    beforeEach(async(() => {
        mockSearchParamService = new MockSearchParamsService();
        const spySearchService =
            jasmine.createSpyObj('SearchService', ['doExtendedSearchCountQueryCountQueryResult', 'doExtendedSearchReadResourceSequence', 'doFullTextSearchReadResourceSequence', 'doFullTextSearchCountQueryCountQueryResult']);

        TestBed.configureTestingModule({
            imports: [
                KuiActionModule,
                MatCardModule,
                MatIconModule,
                MatListModule,
                MatTabsModule,
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            declarations: [
                DateValueComponent,
                ListViewComponent,
                SearchResultsComponent,
                TextValueAsHtmlComponent,
                GridViewComponent,
                TableViewComponent,
                GraphViewComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: (param: string) => {
                                if (param === 'q') {
                                    return q;
                                } else {
                                    return mode;
                                }
                            }
                        })
                    }
                },
                { provide: KuiCoreConfigToken, useValue: KuiCoreConfig },
                { provide: SearchParamsService, useValue: mockSearchParamService },
                { provide: SearchService, useValue: spySearchService },
                HttpClient
            ]
        }).compileComponents();

        searchServiceSpy = TestBed.get(SearchService);

        searchServiceSpy.doExtendedSearchCountQueryCountQueryResult.and.callFake((gravsearch: string) => {

            const countQueryRes = new CountQueryResult(197);

            return of(
                countQueryRes
            );
        });

        searchServiceSpy.doExtendedSearchReadResourceSequence.and.callFake((gravsearch: string) => {

            const letters = require('../../../../../core/src/lib/test-data/search/SearchResultNarr-expanded.json'); // mock response

            const lettersSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(letters);

            const resClasses: ResourceClasses = require('../../../../../core/src/lib/test-data/ontologyinformation/thing-resource-classes.json');
            const properties: Properties = require('../../../../../core/src/lib/test-data/ontologyinformation/thing-properties.json');

            const ontoInfo = new OntologyInformation({}, resClasses, properties);

            lettersSeq.ontologyInformation.updateOntologyInformation(ontoInfo);

            return of(
                lettersSeq
            );
        });

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should perform a count query', () => {
        expect(searchServiceSpy.doExtendedSearchCountQueryCountQueryResult).toHaveBeenCalledTimes(1);

        expect(searchServiceSpy.doExtendedSearchCountQueryCountQueryResult).toHaveBeenCalledWith('testquery0');

        expect(component.numberOfAllResults).toEqual(197);
    });

    it('should perform a gravsearch query', () => {
        expect(searchServiceSpy.doExtendedSearchReadResourceSequence).toHaveBeenCalledTimes(1);

        expect(searchServiceSpy.doExtendedSearchReadResourceSequence).toHaveBeenCalledWith('testquery0');

        expect(component.result.length).toEqual(25);
    });
});

class MockSearchParamsService {

    private _currentSearchParams: BehaviorSubject<any>;

    constructor() {
        this._currentSearchParams = new BehaviorSubject<ExtendedSearchParams>(new ExtendedSearchParams((offset: number) => 'testquery' + offset));
    }

    changeSearchParamsMsg(searchParams: ExtendedSearchParams): void {
        this._currentSearchParams.next(searchParams);
    }

    getSearchParams(): ExtendedSearchParams {
        return this._currentSearchParams.getValue();
    }

}
