import {
  Component, OnInit, ViewChild, OnDestroy,
  ElementRef, AfterViewInit, ChangeDetectorRef, HostListener
} from "@angular/core";
import { ROUTES } from './vertical-menu-routes.config';
import { HROUTES } from '../horizontal-menu/navigation-routes.config';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from "../animations/custom-animations";
import { DeviceDetectorService } from 'ngx-device-detector';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { LayoutService } from '../services/layout.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { select, Store } from '@ngrx/store';
import * as appReducer from '../../store/app.reducer';
import { localStorageTypes } from '../constants/constants';

@Component({
  selector: "app-sidebar",
  templateUrl: "./vertical-menu.component.html",
  styleUrls: ["./vertical-menu.component.scss"],
  animations: customAnimations
})
export class VerticalMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  userRole: string;
  permission: boolean;

  @ViewChild('toggleIcon') toggleIcon: ElementRef;
  public menuItems: any[];
  level: number = 0;
  // logoUrl = 'assets/img/logo.png';
  logoUrl = 'assets/img/logo.svg';
  logoTextUrl = 'assets/img/logo-text.svg';
  logoUrlSmall = 'assets/img/logo-small.png';
  public config: any = {};
  protected innerWidth: any;
  layoutSub: Subscription;
  configSub: Subscription;
  perfectScrollbarEnable = true;
  collapseSidebar = false;
  resizeTimeout: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService,
    public cookieService: CookieService,
    private cookies: CookieService
  ) {
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    this.isTouchDevice();
  }

  ngOnInit() {
    this.menuItems = ROUTES;
    this.permission = false;
    this.userRole = this.authService.currentUser?.role || "";
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();
    });

    this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe(
      collapse => {
        if (this.config.layout.menuPosition === "Side") {
          this.collapseSidebar = collapse;
        }
      });
  }

  checkPermission(roles: string[]) {
    if (roles.indexOf(this.userRole) !== -1) {
      // console.log('role exsist')
      this.permission = true
    } else {
      // console.log('role NOT accepted')
      this.permission = false
    }
    return this.permission
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      this.innerWidth = event.target.innerWidth;
      this.loadLayout();
    }).bind(this), 500);
  }

  loadLayout() {
    if (this.config.layout.menuPosition === "Top") { // Horizontal Menu
      if (this.innerWidth < 1200) { // Screen size < 1200
        this.menuItems = HROUTES;
      }
    }
    else if (this.config.layout.menuPosition === "Side") { // Vertical Menu{
      this.menuItems = ROUTES;
    }

    if (this.config.layout.sidebar.backgroundColor === 'white') {
      // this.logoUrl = 'assets/img/logo-dark.png';
      this.logoUrl = 'assets/img/logo-dark.svg';
      this.logoTextUrl = 'assets/img/logo-text-dark.svg';
      this.logoUrlSmall = 'assets/img/logo-dark-small.png';
    } else {
      // this.logoUrl = 'assets/img/logo.png';
      this.logoUrl = 'assets/img/logo.svg';
      this.logoTextUrl = 'assets/img/logo-text.svg';
      this.logoUrlSmall = 'assets/img/logo-small.png';
    }

    if (this.config.layout.sidebar.collapsed) {
      this.collapseSidebar = true;
    }
    else {
      this.collapseSidebar = false;
    }
  }

  toggleSidebar() {
    let conf = this.config;
    conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });

    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };

  CloseSidebar() {
    this.layoutService.toggleSidebarSmallScreen(false);
  }

  isTouchDevice() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    if (isMobile || isTablet) {
      this.perfectScrollbarEnable = false;
    }
    else {
      this.perfectScrollbarEnable = true;
    }
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }
}
