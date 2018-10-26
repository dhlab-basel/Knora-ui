import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule
} from '@angular/material';

import { ExtendedSearchComponent } from './extended-search.component';
import { SelectOntologyComponent } from './select-ontology/select-ontology.component';
import { SelectResourceClassComponent } from './select-resource-class/select-resource-class.component';
import { SelectPropertyComponent } from './select-property/select-property.component';
import { SpecifyPropertyValueComponent } from './select-property/specify-property-value/specify-property-value.component';
import { GravsearchGenerationService, KuiCoreConfig, OntologyCacheService, OntologyService } from '@knora/core';
import { BooleanValueComponent } from './select-property/specify-property-value/boolean-value/boolean-value.component';
import { DateValueComponent } from './select-property/specify-property-value/date-value/date-value.component';
import { DecimalValueComponent } from './select-property/specify-property-value/decimal-value/decimal-value.component';
import { IntegerValueComponent } from './select-property/specify-property-value/integer-value/integer-value.component';
import { LinkValueComponent } from './select-property/specify-property-value/link-value/link-value.component';
import { TextValueComponent } from './select-property/specify-property-value/text-value/text-value.component';
import { UriValueComponent } from './select-property/specify-property-value/uri-value/uri-value.component';
import { JdnDatepickerDirective } from '../../../../action/src/lib/directives/jdn-datepicker.directive';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    OntologyInformation,
    OntologyMetadata,
    ResourceClass,
    ResourceClassIrisForOntology
} from '../../../../core/src/lib/services';
import {
    Cardinality,
    CardinalityOccurrence, Property,
    ResourceClasses
} from '../../../../core/src/lib/services/v2/ontology-cache.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('ExtendedSearchComponent', () => {

    let componentInstance: ExtendedSearchComponent;
    let fixture: ComponentFixture<ExtendedSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ExtendedSearchComponent,
                SelectOntologyComponent,
                SelectResourceClassComponent,
                SelectPropertyComponent,
                SpecifyPropertyValueComponent,
                BooleanValueComponent,
                DateValueComponent,
                DecimalValueComponent,
                IntegerValueComponent,
                LinkValueComponent,
                TextValueComponent,
                UriValueComponent,
                JdnDatepickerDirective
            ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule,
                HttpClientModule,
                MatCheckboxModule,
                MatIconModule,
                MatFormFieldModule,
                MatSelectModule,
                MatDatepickerModule,
                MatAutocompleteModule,
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: null
                    }
                },
                {provide: 'config', useValue: KuiCoreConfig},
                FormBuilder,
                GravsearchGenerationService,
                OntologyCacheService,
                OntologyService,
                HttpClient,
                ExtendedSearchComponent
            ]
        })
            .compileComponents();

    }));

    beforeEach(inject([OntologyCacheService], (ontoCacheService) => {

        spyOn(ontoCacheService, 'getOntologiesMetadata').and.callFake(() => {

            const ontoMeta = [
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0001/anything/v2', 'The anything ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0001/something/v2', 'The something ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/00FF/images/v2', 'The images demo ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0801/beol/v2', 'The BEOL ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0802/biblio/v2', 'The Biblio ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0803/incunabula/v2', 'The incunabula ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0804/dokubib/v2', 'The dokubib ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/08AE/webern/v2', 'The Anton Webern project ontology'),
                new OntologyMetadata('http://api.knora.org/ontology/knora-api/v2', 'The knora-api ontology in the complex schema')
            ];

            return of(ontoMeta);

        });

        fixture = TestBed.createComponent(ExtendedSearchComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();

    }));

    it('should create', () => {
        expect(componentInstance).toBeTruthy();
    });

    it('should check that add properties is disabled after init', () => {

        const ele: DebugElement = fixture.debugElement;
        const addPropDE = ele.query(By.css('.add-property-button'));

        const addPro = addPropDE.nativeElement;

        expect(addPro.disabled).toBeTruthy();

    });

    it('should correctly initialized the ontologies\' metadata', async(() => {

        const expectedOntoMetata =
            [
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0001/anything/v2', 'The anything ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0001/something/v2', 'The something ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/00FF/images/v2', 'The images demo ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0801/beol/v2', 'The BEOL ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0802/biblio/v2', 'The Biblio ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0803/incunabula/v2', 'The incunabula ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0804/dokubib/v2', 'The dokubib ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/08AE/webern/v2', 'The Anton Webern project ontology'),
                new OntologyMetadata('http://api.knora.org/ontology/knora-api/v2', 'The knora-api ontology in the complex schema')
            ];


        expect(componentInstance.ontologies).toEqual(expectedOntoMetata);

    }));

    it('should get the classes and properties for a specific ontology', async(inject([OntologyCacheService], (ontoCacheService) => {

        spyOn(ontoCacheService, 'getEntityDefinitionsForOntologies').and.callFake((ontoIri: string) => {

            return of(ontoInfo);

        });

        componentInstance.getResourceClassesAndPropertiesForOntology('http://0.0.0.0:3333/ontology/0801/anything/v2');

        expect(componentInstance.activeResourceClass).toBeUndefined();

        expect(componentInstance.activeProperties).toEqual([]);

        expect(componentInstance.activeOntology).toEqual('http://0.0.0.0:3333/ontology/0801/anything/v2');

        expect(componentInstance.resourceClasses).toEqual(ontoInfo.getResourceClassesAsArray());

        expect(componentInstance.properties).toEqual(ontoInfo.getProperties());



    })));

    // TODO: put in a better place

    const resClassesForOnto: ResourceClassIrisForOntology = {
        'http://0.0.0.0:3333/ontology/0001/anything/v2': [
            'http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing'//,
        //'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing',
        //'http://0.0.0.0:3333/ontology/0001/anything/v2#ThingPicture'
        ]
    };

    const resClasses: ResourceClasses = {
        'http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing':
            new ResourceClass(
                'http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing',
                'blueting.png',
                'A blue thing.',
                'blue thing',
                [
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#attachedToProject'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#attachedToUser'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#creationDate'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#hasPermissions'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.card,
                        1,
                        'http://api.knora.org/ontology/knora-api/v2#lastModificationDate'
                    )
                ]
            )
    };

    const properties = {
        'http://api.knora.org/ontology/knora-api/v2#attachedToProject': new Property(
            'http://api.knora.org/ontology/knora-api/v2#attachedToProject',
            'http://api.knora.org/ontology/knora-api/v2#knoraProject',
            'Connects something to a project',
            'attached to project',
            [],
            false,
            false,
            false),
        'http://api.knora.org/ontology/knora-api/v2#attachedToUser': new Property(
            'http://api.knora.org/ontology/knora-api/v2#attachedToUser',
            'http://api.knora.org/ontology/knora-api/v2#User',
            'Connects something to a user',
            'attached to user',
            [],
            false,
            false,
            false),
        'http://api.knora.org/ontology/knora-api/v2#creationDate': new Property(
            'http://api.knora.org/ontology/knora-api/v2#creationDate',
            'http://www.w3.org/2001/XMLSchema#dateTimeStamp',
            'Indicates when a resource was created',
            undefined,
            [],
            false,
            false,
            false),
        'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink': new Property(
            'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink',
            'http://api.knora.org/ontology/knora-api/v2#LinkValue',
            'Indicates that this resource referred to by another resource',
            'has incoming links',
            ['http://api.knora.org/ontology/knora-api/v2#hasLinkToValue'],
            false,
            false,
            true),
        'http://api.knora.org/ontology/knora-api/v2#hasPermissions': new Property(
            'http://api.knora.org/ontology/knora-api/v2#hasPermissions',
            'http://www.w3.org/2001/XMLSchema#string',
            undefined,
            undefined,
            [],
            false,
            false,
            false),
        'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo': new Property(
            'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo',
            'http://api.knora.org/ontology/knora-api/v2#Resource',
            'Represents a link in standoff markup from one resource to another.',
            'has Standoff Link to',
            ['http://api.knora.org/ontology/knora-api/v2#hasLinkTo'],
            false,
            true,
            false),
        'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue': new Property(
            'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue',
            'http://api.knora.org/ontology/knora-api/v2#LinkValue',
            'Represents a link in standoff markup from one resource to another.',
            'has Standoff Link to',
            ['http://api.knora.org/ontology/knora-api/v2#hasLinkToValue'],
            false,
            false,
            true),
        'http://api.knora.org/ontology/knora-api/v2#lastModificationDate': new Property(
            'http://api.knora.org/ontology/knora-api/v2#lastModificationDate',
            'http://www.w3.org/2001/XMLSchema#dateTimeStamp',
            undefined,
            undefined,
            [],
            false,
            false,
            false),
        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText': new Property(
            'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText',
            'http://api.knora.org/ontology/knora-api/v2#TextValue',
            undefined,
            'Text',
            ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
            true,
            false,
            false)
    };

    const ontoInfo = new OntologyInformation(resClassesForOnto, resClasses, properties);
});
