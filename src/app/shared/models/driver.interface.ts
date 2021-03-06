export interface DriverInterface{
  id?: string;
  truckId?: string;
  companyId?: string;
  status?: string;
  fein?: string;
  ssn?: string;
  hireDate?: number;
  terminationDate?: number;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  homePhone?: string;
  cellPhone?: string;
  email?: string;
  division?: string;
  isSendEmail?: boolean;
  isSendTextMessage?: boolean;
  emergencyPhone?: string;
  emergencyRelationship?: string;
  emergencyContact?: string;
  cdlState?: string;
  cdlExpirationDate?: number;
  cdlClass?: string;
  cdlEndorsement?: string;
  cdlNumber?: string;
  statedOperated?: string;
  safeDrivingAwards?: string;
  specialTraining?: string;
  yearsOfExperiece?: number;
  address2?: string;
  zip2?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: number;
  uId?: string;
  truckNumber?: string;
}
