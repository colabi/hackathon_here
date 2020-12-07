import { Component, OnInit, ElementRef } from '@angular/core';
declare var jquery: any;
declare var $: any;
declare var window:any;
declare var H:any;

var platform = new H.service.Platform({
  apikey: 'A HERE SERVICE KEY'
});

var size = 200;
 

@Component({
  selector: 'bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
})
export class BgComponent implements OnInit {


 layout:any = {
    map:true
  }
  lng = 34.059432873501336;
  lat = -118.27756068437706;
  domain = "Power";
  geocoder = null;
  constructor(private elRef:ElementRef) { 
    this.zipcode = 0;
  }

  ngOnInit() {
    window.bg = this;
    var mapel = this.elRef.nativeElement.querySelector('#map');
    var defaultLayers = platform.createDefaultLayers();
    var map = new H.Map(mapel,
      defaultLayers.vector.normal.map, {
      center: { lat: this.lng, lng: this.lat },
      pixelRatio: window.devicePixelRatio || 1,
      zoom: 16,
      tilt:30
    });
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    const XYZ_TOKEN = 'XYZ_TOKEN';
    const service = platform.getXYZService({
      token: XYZ_TOKEN,
    });

    const XYZ_SPACE = 'XYZ_SPACE';
    const mySpaceProvider = new H.service.xyz.Provider(service, XYZ_SPACE, {
    });
    const mySpaceLayer = new H.map.layer.TileLayer(mySpaceProvider);


    // const INCYDENT_SPACE = 'mkmTyBVI';
    // const incydentSpaceProvider = new H.service.xyz.Provider(service, INCYDENT_SPACE, {
    // });
    // const incydentSpaceLayer = new H.map.layer.TileLayer(incydentSpaceLayer);

    // add a layer to the map
    map.addLayer(mySpaceLayer);
    // map.addLayer(incydentSpaceLayer);
    mySpaceProvider.getStyle().setInteractive(['xyz'], true);
    this.map = map;
  }
  data = {
    'type': 'FeatureCollection',
    'features': []
  }
  addFeatureHere(data) {
  var animatedSvg =
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" ' + 
    'y="0px" style="margin:-112px 0 0 -32px" width="136px"' + 
    'height="150px" viewBox="0 0 136 150">' + 
    '<ellipse fill="#1b468d" ' +
    'cx="26" cy="20" rx="16" ry="12"><animate attributeName="cy" ' +
    'from="20" to="20" begin="0s" dur="1.5s" values="20;40;20" ' +
    'keySplines=".6 .1 .8 .1; .1 .8 .1 1" keyTimes=" 0;0.4;1" ' +
    'calcMode="spline" repeatCount="indefinite"/> ' +
    '<animate attributeName="ry" from="16" to="16" begin="0s" ' + 
    'dur="1.5s" values="16;8;16" keySplines=".6 .0 .8 .0; .0 .8 .0 1" ' +
    'keyTimes="0;0.4;1" calcMode="spline" ' +
    'repeatCount="indefinite"/></ellipse></svg>';

    var icon = new H.map.DomIcon(animatedSvg)

    var marker = new H.map.DomMarker({
      lat: data.coord.lat,
      lng: data.coord.lng
    }, 
    {icon: icon}
    );
    this.map.addObject(marker);

  }
  centerHere(coord) {
    console.log("centering: ", coord)
    this.map.setCenter({lat: coord.lat, lng: coord.lng}, true)
  }

  
}
