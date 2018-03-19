import { Component, OnInit } from '@angular/core';
import { UrlAdresses} from '../url_adresses';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IPhoto {
  data: Array<any>
}
@Component({
  selector: 'app-instagram-content',
  templateUrl: './instagram-content.component.html',
  styleUrls: ['./instagram-content.component.scss']
})
export class InstagramContentComponent implements OnInit {
  base_url: string;
  GetInstaPhoto: string;
  images={data: []};

  constructor(private urlAdresses: UrlAdresses, private http: HttpClient) {
    this.base_url = urlAdresses.base_url;
    this.GetInstaPhoto = urlAdresses.GetInstaPhoto;

    this.http.get<IPhoto>(this.GetInstaPhoto)
        .subscribe((res: IPhoto)=>{
          this.images.data = res.data;
        });
  }

  ngOnInit() {
  }

}
