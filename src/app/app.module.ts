import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import {DpDatePickerModule} from 'ng2-date-picker';
import { BucketModule } from './bucket-module';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { ShareModule } from '@ngx-share/core';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MomentModule } from 'ngx-moment';
import {NgxMaskModule} from 'ngx-mask';

import {UrlAdresses} from './url_adresses';
import { EventsListService } from './events-list/events-list.service';
import { RestaurantsListService } from './restaurants-list/restaurants-list.service';
import { OrderService } from './order.service';
import { PersonalService } from './personal/personal.service';
import { OrderFormService } from './order-form/order-form.service';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header/header.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuTabsInsideComponent } from './menu-tabs-inside/menu-tabs-inside.component';
import { RestaurantBlockComponent } from './restaurant-block/restaurant-block.component';
import { EventsBlockComponent } from './events-block/events-block.component';
import { InstagramContentComponent } from './instagram-content/instagram-content.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventComponent } from './event/event.component';
import { AboutComponent } from './about/about.component';
import { AboutConceptComponent } from './about/about-concept/about-concept.component';
import { AboutNewsComponent } from './about/about-news/about-news.component';
import { AboutVacanciesComponent } from './about/about-vacancies/about-vacancies.component';
import { StockBannerComponent } from './stock-banner/stock-banner.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { RestaurantsResultComponent } from './restaurants-result/restaurants-result.component';
import { DishBlockComponent } from './dish-block/dish-block.component';
import { SubmenuCalendarComponent } from './submenu-calendar/submenu-calendar.component';
import { StocksComponent } from './stocks/stocks.component';
import { SearchBlockComponent } from './search-block/search-block.component';
import { RestaurantsStockBlockComponent } from './restaurants-stock-block/restaurants-stock-block.component';
import { RestaurantsMainComponent } from './restaurants-main/restaurants-main.component';
import { RestaurantBlockFooterComponent } from './restaurant-block-footer/restaurant-block-footer.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { PersonalComponent } from './personal/personal.component';
import { DataComponent } from './personal/data/data.component';
import { HistoryComponent } from './personal/history/history.component';
import { AddressComponent } from './personal/address/address.component';
import { BonusComponent } from './personal/bonus/bonus.component';
import { LastStepComponent } from './last-step/last-step.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { SelfdeliveryComponent } from './order-form/selfdelivery/selfdelivery.component';
import { OrderDeliveryComponent } from './order-form/order-delivery/order-delivery.component';
import { BucketComponent } from './bucket/bucket.component';
import { PasswordComponent } from './password/password.component';
import { PasswordSendComponent } from './password-send/password-send.component';
import { LoginComponent } from './login/login.component';
import { MidifiersComponent } from './restaurants-main/midifiers/midifiers.component';
import { BusketMobComponent } from './busket-mob/busket-mob.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { LoaderComponent } from './loader/loader.component';

const AppRoutes: Routes = [
  { path: '', component: HomeComponent,  data: { title: 'Вокруг Света' }  },
  { path: 'events', component: EventsListComponent,  data: { title: 'События' }  },
  { path: 'event/:id', component: EventComponent },
  { path: 'about', component: AboutComponent,  data: { title: 'О проекте' }  },
  { path: 'banner', component: StockBannerComponent },
  { path: 'contacts', component: ContactsComponent,  data: { title: 'Контакты' }  },
  { path: 'delivery', component: DeliveryComponent,  data: { title: 'Доставка' }  },
  { path: 'corners', component: RestaurantsListComponent,  data: { title: 'Корнеры' }  },
  { path: 'results', component: RestaurantsResultComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'restaurants-main/:id', component: RestaurantsMainComponent },
  { path: 'personal', component: PersonalComponent,  data: { title: 'Личный кабинет' }  },
  { path: 'last', component: LastStepComponent },
  { path: 'order', component: OrderFormComponent,  data: { title: 'Оформление заказа' }  },
  { path: 'bucket', component: BucketComponent,  data: { title: 'Корзина' }  },
  { path: 'repeatpass', component: PasswordComponent },
  { path: 'modifiers', component: MidifiersComponent },
  { path: 'login', component: LoginComponent,  data: { title: 'Логин' }  },
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuTabsInsideComponent,
    RestaurantBlockComponent,
    EventsBlockComponent,
    InstagramContentComponent,
    EventsListComponent,
    EventComponent,
    AboutComponent,
    AboutConceptComponent,
    AboutNewsComponent,
    AboutVacanciesComponent,
    StockBannerComponent,
    ContactsComponent,
    DeliveryComponent,
    RestaurantsListComponent,
    SubmenuComponent,
    RestaurantsResultComponent,
    DishBlockComponent,
    SubmenuCalendarComponent,
    StocksComponent,
    SearchBlockComponent,
    RestaurantsStockBlockComponent,
    RestaurantsMainComponent,
    RestaurantBlockFooterComponent,
    MobileMenuComponent,
    PersonalComponent,
    DataComponent,
    HistoryComponent,
    AddressComponent,
    BonusComponent,
    LastStepComponent,
    OrderFormComponent,
    SelfdeliveryComponent,
    OrderDeliveryComponent,
    MidifiersComponent,
    BusketMobComponent,
    ErrorPopupComponent,
    LoaderComponent,
    BucketComponent,
    PasswordComponent,
    PasswordSendComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(
        AppRoutes
    ),
    OwlModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDVwjBEb9XZk_YLCB5-Bv7S30YvpzDCJsc'
    }),
    AgmSnazzyInfoWindowModule,
    DpDatePickerModule,
    HttpClientModule,
    BucketModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule.forRoot(),
    ShareButtonsModule.forRoot(),
    ScrollToModule.forRoot(),
    MomentModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    UrlAdresses,
    RouterLinkActive,
    EventsListService,
    RestaurantsListService,
    OrderService,
    CookieService,
    HeaderService,
    PersonalService,
    OrderFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
