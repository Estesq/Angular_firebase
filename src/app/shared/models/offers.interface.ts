export interface OffersInterface {
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
}
