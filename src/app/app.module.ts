import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgModule,
  LOCALE_ID,
  APP_INITIALIZER,
  ApplicationRef,
  NgModuleFactoryLoader,
  SystemJsNgModuleLoader,
} from '@angular/core';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

import localeEsMx from '@angular/common/locales/es';
registerLocaleData(localeEsMx);

// Import containers
import { FullLayoutComponent, SimpleLayoutComponent } from './containers';

const APP_CONTAINERS = [FullLayoutComponent, SimpleLayoutComponent];

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  AppSidebarNavComponent,
  AppSidebarNavDropdownComponent,
  AppSidebarNavItemComponent,
  AppSidebarNavLinkComponent,
  AppSidebarNavTitleComponent,
} from './core';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  AppSidebarNavComponent,
  AppSidebarNavDropdownComponent,
  AppSidebarNavItemComponent,
  AppSidebarNavLinkComponent,
  AppSidebarNavTitleComponent,
];

// Import global directives
import {
  AsideToggleDirective,
  NavDropdownDirective,
  NavDropdownToggleDirective,
  ReplaceDirective,
  SidebarMinimizeDirective,
  SidebarOffCanvasCloseDirective,
  BrandMinimizeDirective,
  SidebarToggleDirective,
  MobileSidebarToggleDirective,
} from './core/directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NavDropdownDirective,
  NavDropdownToggleDirective,
  ReplaceDirective,
  SidebarMinimizeDirective,
  SidebarOffCanvasCloseDirective,
  BrandMinimizeDirective,
  SidebarToggleDirective,
  MobileSidebarToggleDirective,
];

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { BlockUIModule } from 'ng-block-ui';
import { DataTableModule } from 'primeng/primeng';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MessageService } from 'primeng/components/common/messageservice';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';

// Import Global Services

import { AuthGuard } from './guards/Auth.guard';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthenticationService, MenuService, ConfigService } from './services/index';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export function ConfigLoader(configService: ConfigService) {
  return () => configService.getJSON();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    BlockUIModule.forRoot(),
    DataTableModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    PerfectScrollbarModule,
  ],
  declarations: [AppComponent, ...APP_CONTAINERS, ...APP_COMPONENTS, ...APP_DIRECTIVES],
  providers: [
    AuthGuard,
    AuthenticationService,
    { provide: LOCALE_ID, useValue: 'es-MX' },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    MenuService,
    MessageService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true,
    },
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    if (!store || !store.state) {
      return;
    }
    // console.log('HMR store', store);
    // console.log('store.state.data:', store.state.data)
    // inject AppStore here and update it
    // this.AppStore.update(store.state)
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    // change detection
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // inject your AppStore and grab state then set it on store
    // var appState = this.AppStore.get()
    store.state = { data: 'yolo' };
    // store.state = Object.assign({}, appState)
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
    // anything you need done the component is removed
  }
}
