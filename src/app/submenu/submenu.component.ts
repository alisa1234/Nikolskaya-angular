import {Component, OnInit, HostListener, ViewChild, ElementRef, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlAdresses} from '../url_adresses'
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-submenu',
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.scss']
})

export class SubmenuComponent implements OnInit {

    base_url: string;
    GetMainTags: string;
    type_menu: { [index: string]: boolean } = {};
    show_submenu: boolean = false;
    tags: any;
    first_rest_arr: any;
    @Input() _parent: any;
    @ViewChild('submenu_corners') submenu_block: ElementRef;

    constructor(private http: HttpClient, urlAdresses: UrlAdresses) {

        this.base_url = urlAdresses.base_url;
        this.GetMainTags = urlAdresses.GetMainTags;
        this.type_menu[0] = true;

        this.http.get(this.base_url + this.GetMainTags)
            .subscribe(data => {
                let new_tag=[];
                this.tags = data;
                this.tags.forEach(item => {
                    if(item.MainTag) {
                        new_tag.push(item);
                    }
                    this.tags = new_tag;
                    this.type_menu[item.Id] = false;
                });
            });
    }

    ngOnInit() {
    }

    @HostListener('window:scroll', ['$event'])
    onWindowsScroll(event) {
        let offset = event.currentTarget.pageYOffset;
        let offsetX = document.body.clientWidth;

        let docWidth = document.body.clientWidth;

        if (offset > 537) {
            let submenuStyle = this.submenu_block.nativeElement.style;
            submenuStyle.position = 'fixed';
            submenuStyle.top = '0';
            submenuStyle.width = '100%';
            submenuStyle.zIndex = '9';
            submenuStyle.backgroundColor = '#FFFFFF';
            if (offsetX < 768) {
            }

        } else {
            let submenuStyle = this.submenu_block.nativeElement.style;
            submenuStyle.position = 'relative';
            submenuStyle.zIndex = '8';
            if (offsetX < 768) {
                submenuStyle.width = '';
            }

        }
    }

    chooseMenu(type_menu: number) {
        this._parent.filter = true;

        for (let key in this.type_menu) {
            this.type_menu[key] = false;
            this.type_menu[type_menu] = true;
        }
        if (this.type_menu[0] == true) {
            this._parent.filter = false;
        } else {
            this.first_rest_arr = this._parent.restauants_list;
            let rest_arr = [];
            for (let i = 0; i < this._parent.restauants_list.length; i++) {
                for (let y = 0; y < this._parent.restauants_list[i].Tags.length; y++) {
                    if (type_menu == this._parent.restauants_list[i].Tags[y].Id) {
                        rest_arr.push(this._parent.restauants_list[i]);
                    }
                }

            }
            this._parent.filter_res_list = rest_arr;
        }

    }

    showSubmenu() {

        this.show_submenu = !this.show_submenu;
    }

}
