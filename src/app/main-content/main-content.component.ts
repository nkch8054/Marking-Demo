import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BoxDialogComponent } from '../box-dialog/box-dialog.component';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
    controls = [
        /*  { markerType: 'checkbox', id: this.id++, style: null },
         { markerType: 'text', id: this.id++, style: null } */
    ];

    ttStyle;
    type;
    id = 0;
    toolshow: boolean;
    controlsstyle: any[] = [
        { type: "checkbox", w: 30, h: 30, position: 'absolute' },
        { type: "textfield", w: 200, h: 35, position: 'absolute' },
        { type: "textbox", w: 200, h: 35, position: 'absolute' }
    ];

    constructor(private dialog: MatDialog) {
        let data = JSON.parse(localStorage.getItem('data'));
        this.id = data ? data.length : 0;
        this.controls = data ? data : [];
    }

    onClick(event: MouseEvent, type) {
        this.type = type;
        this.toolshow = true;
    }

    mouseMove(event: MouseEvent) {
        if (this.toolshow) {
            this.ttStyle = {
                'left': event.clientX - 60 + 'px',
                'top': event.clientY - 60 + 'px',
                'display': 'block'
            }
        }
    }

    mouseup() {
        this.type = 0;
    }

    mouseDown(event: MouseEvent) {
        if (this.type) {
            let controlstyle = this.controlsstyle[this.type - 1];
            this.id++;
            this.toolshow = false;
            controlstyle['x'] = event.clientX;
            controlstyle['y'] = event.clientY;
            this.ttStyle = {
                'display': 'none'
            }
            if (this.type == 3) {
                let boxCount: number = 5;
                let collection: any[] = [];
                let w = controlstyle.w / boxCount;
                for (let i = 1; i <= boxCount; i++) {
                    collection.push({ text: "", tabIndex: i, w: w, h: controlstyle.h });
                }
                this.controls.push({
                    markerType: controlstyle.type, id: this.id, x: controlstyle.x, y: controlstyle.y,
                    w: controlstyle.w, h: controlstyle.h, position: controlstyle.position, boxCollection: collection
                });
            } else {
                this.controls.push({
                    markerType: controlstyle.type, id: this.id, x: controlstyle.x, y: controlstyle.y,
                    w: controlstyle.w, h: controlstyle.h, position: controlstyle.position
                });
            }
            console.log(this.controls);
        }
    }

    onMoveEnd(endOffset, el: Element) {
        let id: any = el.getAttribute('id');
        this.controls[id - 1]['offsetX'] = endOffset.x;
        this.controls[id - 1]['offsetY'] = endOffset.y;
    }

    onResizeStop(event, el: Element) {
        let id: any = el.getAttribute('id');
        let size = event.size;
        this.controls[id - 1].h = size.height;
        this.controls[id - 1].w = size.width;
        let boxCollection = this.controls[id - 1].boxCollection ? this.controls[id - 1].boxCollection : [];
        let length = boxCollection.length;
        if (length) {
            let w = size.width / length;
            for (let i = 0; i < length; i++) {
                boxCollection[i].w = w;
                boxCollection[i].h = size.height;
            }
        }
        this.controls[id - 1].boxCollection = boxCollection;
    }

    dblclick() {
        this.dialog.open(BoxDialogComponent);
    }

    save() {
        localStorage.setItem('data', JSON.stringify(this.controls));
    }

}
