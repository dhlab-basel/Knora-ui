import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatDatepickerModule,
    MatFormFieldModule
} from '@angular/material';

import { DateValueComponent } from '@knora/search';
import { JdnDatepickerDirective } from './jdn-datepicker.directive';
import { JDNConvertibleCalendarDateAdapter } from 'jdnconvertiblecalendardateadapter';
import { JDNConvertibleCalendar } from 'jdnconvertiblecalendar';

describe('JdnDatepickerDirective', () => {
    let component: DateValueComponent;
    let fixture: ComponentFixture<DateValueComponent>;
    let jdnDatepicker: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDatepickerModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
            declarations: [DateValueComponent, JdnDatepickerDirective],
            providers: [
                MatDatepickerModule,
                /* { provide: DateAdapter, useClass: JDNConvertibleCalendarDateAdapter, deps: [MAT_DATE_LOCALE, MAT_DATE_FORMATS] } */
            ]
        });
        fixture = TestBed.createComponent(DateValueComponent);
        component = fixture.componentInstance;
        jdnDatepicker = fixture.debugElement.query(By.css('jdnDatepicker'));
    });

    /* it('should create an instance', () => {

        const directive = new JdnDatepickerDirective(new DateAdapter<JDNConvertibleCalendar>);
        expect(directive).toBeTruthy();

    }); */

});
