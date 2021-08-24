export interface StopsInterface{
  id?: string;
  companyId?: string;
  loadId?: string;
  createdById?: string;
  createdByName?: string;
  createdAt?: string;
  pickupAddress?: string;
  pickupState?: string;
  pickupZip?: string;
//  pickupGps?: string;
//  pickupLat?: number;
//  pickupLng?: number;
//  pickupDate?: number;
//  deliveryZip?: string;
//  deliveryGps?: string;
//  deliveryDate?: number;
  deliveryAddress?: string;
  deliveryState?: string;
  deliveryLat?: number;
  deliveryLng?: number;
  truckId?: string;
  truckNumber?: string;


  trailerNumber?:string;
  driver1?:string;
  driver2?:string;
  emptyMi?:string;
  loadedMi?:string;


  equipmentType?:string;
  price?:number;
  weight?:number;
  fp?:string;
  dhd?:string;
  temperature?:number;
  skids?:string;
  commodity?:string;


  customerName?:string;
  custLoadNumber?:string;
  email?:string;
  contactName?:string;
  dispatch?:string;

  locationName?:string;
  date?:number;
  loactionPhone?:number;
  address?:string;
  city?:string;
  state?:string;
  zipcode?:number;
  direction?:string;
  notes?:string;
  






}
