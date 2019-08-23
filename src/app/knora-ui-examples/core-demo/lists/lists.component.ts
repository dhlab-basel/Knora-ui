import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { ApiServiceError, ListNode, ListsService } from '@knora/core';
import { AppDemo } from '../../../app.config';
import { Example } from '../../../app.interfaces';

/* class ListNode {
    label: string;
    children: ListNode[];
    type: any;
} */

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

    module = AppDemo.coreModule;

    projectIri: string = 'http://rdfh.ch/projects/00FF';

    projectLists: ListNode[];

    treeControl: FlatTreeControl<ListNode>;

    exampleGetLists: Example = {
        title: 'getAllLists()',
        subtitle: 'returns a list of all lists',
        name: 'getAllLists',
        code: {
            html: `
<ul>
    <li *ngFor="let item of projectLists">
        <strong>{{item.labels[0].value}}</strong><br>
        <span *ngIf="item.comments.length > 0">{{item.comments[0].value}}</span>
    </li>
</ul>`,
            ts: `
projectIri: string;

projectLists: ListNode[];

constructor(public _listsService: ListsService) {}

ngOnInit() {
    this._listsService.getLists(this.projectIri)
        .subscribe(
            (result: ListNode[]) => {
                this.projectLists = result;
            },
            (error: ApiServiceError) => {
                console.error(error);
            }
        );
}`,
            scss: ``
        }
    };

    constructor (public listsService: ListsService) {
    }

    ngOnInit() {
        // deactivated for docs
        // this.getAllLists();
    }


    getAllLists() {
        this.listsService.getLists(this.projectIri)
            .subscribe(
                (result: ListNode[]) => {
                    this.projectLists = result;
                },
                (error: ApiServiceError) => {
                    console.error(error);
                }
            );

    }
}
