import {
    ReadDateValue,
    ReadDecimalValue,
    ReadIntegerValue,
    ReadLinkValue, ReadStillImageFileValue,
    ReadTextValueAsHtml,
    ReadTextValueAsString,
    ReadTextValueAsXml,
    ReferredResourcesByStandoffLink
} from './read-property-item';
import { ReadResource } from '../../..';
import { OntologyInformation, ResourceClass } from '../../../../services';

describe('ReadPropertyItem', () => {

    it('should create a ReadTextValueAsString', () => {

        const stringItem = new ReadTextValueAsString('http://rdfh.ch/00c650d23303/values/af68552c3626', 'http://0.0.0.0:3333/ontology/0803/incunabula/v2#description', 'This is a test');

        expect(stringItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(stringItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#TextValue');
        expect(stringItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#description');
        expect(stringItem.str).toEqual('This is a test');
        expect(stringItem.getClassName()).toEqual('ReadTextValueAsString');
    });

    it('should create a ReadTextValueAsHtml', () => {

        const referredResourcesInStandoff: ReferredResourcesByStandoffLink = {
            'http://rdfh.ch/test': testResource
        };

        const htmlItem = new ReadTextValueAsHtml('http://rdfh.ch/00c650d23303/values/af68552c3626',
            'http://0.0.0.0:3333/ontology/0803/incunabula/v2#description',
            'This is a test with <a href="http://rdfh.ch/test" class="salsah-link">a standoff link</a>',
            referredResourcesInStandoff);

        expect(htmlItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(htmlItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#TextValue');
        expect(htmlItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#description');
        expect(htmlItem.html).toEqual('This is a test with <a href="http://rdfh.ch/test" class="salsah-link">a standoff link</a>');
        expect(htmlItem.getClassName()).toEqual('ReadTextValueAsHtml');

        expect(htmlItem.referredResources).toBe(referredResourcesInStandoff);
        expect(htmlItem.getReferredResourceInfo('http://rdfh.ch/test', ontologyInfo)).toEqual('test resource (book)');

    });

    it('should create a ReadTextValueAsXml', () => {

        const xmlItem = new ReadTextValueAsXml('http://rdfh.ch/00c650d23303/values/af68552c3626', 'http://0.0.0.0:3333/ontology/0803/incunabula/v2#description', '<root>This is a test</root>', 'http://rdfh.ch/00c650d23303/mappings/af68552c3626');

        expect(xmlItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(xmlItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#TextValue');
        expect(xmlItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#description');
        expect(xmlItem.xml).toEqual('<root>This is a test</root>');
        expect(xmlItem.mappingIri).toEqual('http://rdfh.ch/00c650d23303/mappings/af68552c3626');

        expect(xmlItem.getClassName()).toEqual('ReadTextValueAsXml');
    });

    it('should create a ReadDateValue', () => {

        const dateItem = new ReadDateValue(
            'http://rdfh.ch/00c650d23303/values/af68552c3626',
            'http://0.0.0.0:3333/ontology/0803/incunabula/v2#pubDate',
            'GREGORIAN',
            2018,
            2019,
            'CE',
            'CE',
            5,
            6,
            18,
            19);

        expect(dateItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(dateItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#DateValue');
        expect(dateItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#pubDate');
        expect(dateItem.getClassName()).toEqual('ReadDateValue');

        expect(dateItem.startYear).toEqual(2018);
        expect(dateItem.endYear).toEqual(2019);
        expect(dateItem.startMonth).toEqual(5);
        expect(dateItem.endMonth).toEqual(6);
        expect(dateItem.startDay).toEqual(18);
        expect(dateItem.endDay).toEqual(19);
        expect(dateItem.startEra).toEqual('CE');
        expect(dateItem.endEra).toEqual('CE');


        // TODO: add more tests after refactoring (https://github.com/dhlab-basel/Knora-ui/pull/94)
    });

    it('should create a ReadLinkValue', () => {

        const linkItem = new ReadLinkValue(
            'http://rdfh.ch/00c650d23303/values/af68552c3626',
            'http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasReference',
            'http://rdfh.ch/test',
            testResource
        );

        expect(linkItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(linkItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#LinkValue');
        expect(linkItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasReference');
        expect(linkItem.getClassName()).toEqual('ReadLinkValue');
        expect(linkItem.referredResourceIri).toEqual('http://rdfh.ch/test');

        expect(linkItem.getReferredResourceInfo(ontologyInfo)).toEqual('test resource (book)');

    });

    it('should create a ReadIntegerValue', () => {

        const intItem = new ReadIntegerValue('http://rdfh.ch/00c650d23303/values/af68552c3626', 'http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasInteger', 1);

        expect(intItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(intItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#IntValue');
        expect(intItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasInteger');
        expect(intItem.getClassName()).toEqual('ReadIntegerValue');

        expect(intItem.integer).toEqual(1);

    });

    it('should create a ReadDecimalValue', () => {

        const decItem = new ReadDecimalValue('http://rdfh.ch/00c650d23303/values/af68552c3626', 'http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasDecimal', 1.1);

        expect(decItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(decItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#DecimalValue');
        expect(decItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasDecimal');
        expect(decItem.getClassName()).toEqual('ReadDecimalValue');

        expect(decItem.decimal).toEqual(1.1);

    });

    it('should create a ReadStillImageFileValue (full)', () => {

        const imageItem = new ReadStillImageFileValue(
            'http://rdfh.ch/00c650d23303/values/af68552c3626',
            'http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasImage',
            'incunabula_0000003856.jp2',
            'http://localhost:1024/knora',
            'http://localhost:1024/knora/incunabula_0000003856.jp2/full/1904,2700/0/default.jpg',
            1904,
            2700);

        expect(imageItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(imageItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#StillImageFileValue');
        expect(imageItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasImage');
        expect(imageItem.getClassName()).toEqual('ReadStillImageFileValue');

        expect(imageItem.imageFilename).toEqual('incunabula_0000003856.jp2');
        expect(imageItem.imageServerIIIFBaseURL).toEqual('http://localhost:1024/knora');
        expect(imageItem.imagePath).toEqual('http://localhost:1024/knora/incunabula_0000003856.jp2/full/1904,2700/0/default.jpg');
        expect(imageItem.dimX).toEqual(1904);
        expect(imageItem.dimY).toEqual(2700);
        expect(imageItem.isPreview).toEqual(false);


    });

    it('should create a ReadStillImageFileValue (preview)', () => {

        const imageItem = new ReadStillImageFileValue(
            'http://rdfh.ch/00c650d23303/values/af68552c3626',
            'http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasImage',
            'incunabula_0000003856.jp2',
            'http://localhost:1024/knora',
            'http://localhost:1024/knora/incunabula_0000003856.jp2/full/1904,2700/0/default.jpg',
            190,
            270,
            true);

        expect(imageItem.id).toEqual('http://rdfh.ch/00c650d23303/values/af68552c3626');
        expect(imageItem.type).toEqual('http://api.knora.org/ontology/knora-api/v2#StillImageFileValue');
        expect(imageItem.propIri).toEqual('http://0.0.0.0:3333/ontology/0803/incunabula/v2#hasImage');
        expect(imageItem.getClassName()).toEqual('ReadStillImageFileValue');

        expect(imageItem.imageFilename).toEqual('incunabula_0000003856.jp2');
        expect(imageItem.imageServerIIIFBaseURL).toEqual('http://localhost:1024/knora');
        expect(imageItem.imagePath).toEqual('http://localhost:1024/knora/incunabula_0000003856.jp2/full/1904,2700/0/default.jpg');
        expect(imageItem.dimX).toEqual(190);
        expect(imageItem.dimY).toEqual(270);
        expect(imageItem.isPreview).toEqual(true);


    });


});

// test resources and ontology information

const testResource = new ReadResource('http://rdfh.ch/test',
    'http://0.0.0.0:3333/ontology/0803/incunabula/v2#book',
    'test resource',
    [],
    [],
    [],
    [],
    {}
);

const resClasses = {
    'http://0.0.0.0:3333/ontology/0803/incunabula/v2#book': new ResourceClass(
        'http://0.0.0.0:3333/ontology/0803/incunabula/v2#book',
        'book.png',
        'A book',
        'book',
        [])
};

const ontologyInfo = new OntologyInformation({}, resClasses, {});
