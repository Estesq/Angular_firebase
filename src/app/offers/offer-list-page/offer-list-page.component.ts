import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";
import { ConfigService } from "app/shared/services/config.service";
import { DOCUMENT } from '@angular/common';
import { OffersInterface } from '../../shared/models/offers.interface';
declare let H: any;

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  resizeObservable: Observable<Event>
  resizeSubscription: Subscription
  active = 1; // Basic Navs
  mapConfig: any;
  mapElement: any;
  map: any;
  platform: any;
  defaultLayers: any;
  bubble: any;
  ui: any;
  behavior: any;
  distance: number;
  duration: {
    minutes: number,
    seconds: number
  };

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    private configService: ConfigService,
  ) {
    this.mapConfig = this.configService.hereMapApiConfig;
    this.platform = new H.service.Platform({
      apikey: this.mapConfig.apiKey
    });
    this.defaultLayers = this.platform.createDefaultLayers();
  }

  ngOnInit(): void {
    this.mapElement = this.document.getElementById('map')
    this.map = new H.Map(this.mapElement,
      this.defaultLayers.vector.normal.map, {
      center: { lat: 37.773972, lng: -122.431297, },
      zoom: 11,
      pixelRatio: window.devicePixelRatio || 1
    });
    this.resizeObservable = fromEvent(window, 'resize')
    this.resizeSubscription = this.resizeObservable.subscribe(evt => {
      this.map.getViewPort().resize()
    })
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
  }
  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }

  selectedOfferChangedHandler(offer: OffersInterface) {
    this.calculateRouteFromAtoB(offer);
  }

  async calculateRouteFromAtoB(offer: any) {
    let router = this.platform.getRoutingService(null, 8);
    let routeRequestParams = {
      routingMode: 'fast',
      transportMode: 'car',
      origin: `${offer.pickupLat},${offer.pickupLng}`,
      destination: `${offer.deliveryLat},${offer.deliveryLng}`,
      return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
    };

    try {
      const result = await new Promise((resolve, reject) => {
        router.calculateRoute(routeRequestParams, resolve, reject);
      })
      this.onSuccess(result);
    } catch (error) {
      console.log("Wrong routeRequestParams:", routeRequestParams);
    }
  }

  onSuccess(result: any) {
    const route = result.routes[0];
    this.addRouteShapeToMap(route);
    this.addManueversToMap(route);
    this.getSummary(route);
  }


  openBubble(position: any, text: any) {
    if (!this.bubble) {
      this.bubble = new H.ui.InfoBubble(
        position,
        { content: text }
      );
      console.log("openBubble:", this.bubble, position, text)
      this.ui.addBubble(this.bubble);
    } else {
      this.bubble.setPosition(position);
      this.bubble.setContent(text);
      this.bubble.open();
    }
  }

  addRouteShapeToMap(route: any) {
    route.sections.forEach((section: any) => {
      let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

      let polyline = new H.map.Polyline(linestring, {
        style: {
          lineWidth: 4,
          strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
      });

      this.map.addObject(polyline);
      // console.log(polyline.getBoundingBox())
      this.map.getViewModel().setLookAtData({
        bounds: polyline.getBoundingBox()
      });
      // this.map.setZoom(this.map.getZoom() + 1);
      // console.log("map Zoom:", this.map.getZoom())
    });
  }

  addManueversToMap(route: any) {
    const vm = this;
    let svgMarkup = '<svg width="18" height="18" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="8" r="8" ' +
      'fill="#1b468d" stroke="white" stroke-width="1" />' +
      '</svg>';
    let dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } });
    let group = new H.map.Group();
    let i;

    route.sections.forEach((section: any) => {
      let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();

      let actions = section.actions;
      for (i = 0; i < actions.length; i += 1) {
        let action = actions[i];
        let marker = new H.map.Marker({
          lat: poly[action.offset * 3],
          lng: poly[action.offset * 3 + 1]
        },
          { icon: dotIcon });
        marker.instruction = action.instruction;
        group.addObject(marker);
      }

      group.addEventListener('tap', function (evt: any) {
        vm.map.setCenter(evt.target.getGeometry());
        vm.openBubble(evt.target.getGeometry(), evt.target.instruction);
      }, false);

      this.map.addObject(group);
    });
  }

  getSummary(route: any) {
    let duration = 0;
    let distance = 0;

    route.sections.forEach((section: any) => {
      distance += section.travelSummary.length;
      duration += section.travelSummary.duration;
    });
    this.duration = this.toMMSS(duration);
    this.distance = distance;
  }

  toMMSS(duration: any) {
    return {
      minutes: Math.floor(duration / 60),
      seconds: (duration % 60)
    }
  }
}
