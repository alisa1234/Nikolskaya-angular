import {Component, OnInit, HostListener, ViewChild, ElementRef, Input} from '@angular/core';

@Component({
    selector: 'app-menu-tabs-inside',
    templateUrl: './menu-tabs-inside.component.html',
    styleUrls: ['./menu-tabs-inside.component.scss']
})

export class MenuTabsInsideComponent implements OnInit {

    scrolling: boolean = true;
    @Input() _parent: any;
    @ViewChild('submenu') submenu_block: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', ['$event'])
    onWindowsScroll(event) {

        let offset = event.currentTarget.pageYOffset;
        let offsetX = document.body.clientWidth;

        let docWidth = document.body.clientWidth;

        if (offset > 830) {
            this.scrolling = false;
            setTimeout(() => {

                let submenuStyle = this.submenu_block.nativeElement.style;
                submenuStyle.position = 'fixed';
                submenuStyle.top = '0';
                submenuStyle.width = '100%';
                submenuStyle.zIndex = '9';
                submenuStyle.backgroundColor = '#FFFFFF';
                if (offsetX < 768) {
                }
            }, 0)

        } else {
            let submenuStyle = this.submenu_block.nativeElement.style;
            submenuStyle.position = 'relative';
            submenuStyle.zIndex = '8';
            this.scrolling = true;
            if (offsetX < 768) {
                submenuStyle.width = '';
            }
        }
    }
}
