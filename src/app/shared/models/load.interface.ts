/* export interface LoadInterface{
  id?: string;
  companyId?: string;
  companyName?: string;
  createdById?: string;
  createdByName?: string;
  createdAt?: string;
  pickupAddress?: string;
  pickupState?: string;
  pickupZip?: string;
  pickupGps?: string;
  pickupLat?: number;
  pickupLng?: number;
  pickupDate?: number;
  deliveryZip?: string;
  deliveryGps?: string;
  deliveryDate?: number;
  deliveryAddress?: string;
  deliveryState?: string;
  deliveryLat?: number;
  deliveryLng?: number;
  truckId?: string;
  truckNumber?: string;
} */
export interface LoadInterface{

  id?: string;
  companyId?: string;
  companyName?: string;
  createdById?: string;
  createdByName?: string;
  createdAt?: string;
  pickupAddress?: string;
  pickupState?: string;
  pickupZip?: string;
  pickupGps?: string;
  pickupLat?: number;
  pickupLng?: number;
  pickupDate?: number;
  deliveryZip?: string;
  deliveryGps?: string;
  deliveryDate?: number;
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
  time?:number;


  equipmentType:string;
  price?:number;
  //rate?:number;
  weight?:number;
  fp?:string;
  dhO?:number;
  dhD?:number;

  customerName?:string;
  custLoadNumber?:string;
  email?:string;
  contactName?:string;
  dispatch?:string;



}
