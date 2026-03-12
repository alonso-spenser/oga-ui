import { CreatePageStore } from "../create-page-store";

/**
 * API URL
 */
export enum OrganizeEmployeeApi {
  Detail = "/api/organize/employee/detail",
  Update = "/api/organize/employee/update",
  Insert = "/api/organize/employee/update",
  Delete = "/api/organize/employee/delete",
  Paging = "/api/organize/employee/paging",
  List = "/api/organize/employee/list",
}

/**
 * Organize Employee
 * organize-employee-store.ts
 */
export interface OrganizeEmployeeModel {
  id?: string;
  account?: string;
  address?: string;
  areaCode?: string;
  avatar?: string;
  chest?: number;
  cup?: number;
  dateOfBirth?: bigint;
  email?: string;
  expirationDate?: bigint;
  firstName?: string;
  height?: number;
  hip?: number;
  lastName?: string;
  middleName?: string;
  mobile?: string;
  nationality?: string;
  nationalityId?: string;
  onboardingTime?: bigint;
  organizeId?: string;
  password?: string;
  position?: string;
  referId?: string;
  referName?: string;
  resign?: number;
  salt?: string;
  sex?: number;
  skinColor?: string;
  state?: number;
  tiktokAccount?: string;
  tiktokName?: string;
  timeOfLeaving?: bigint;
  timeZoneId?: string;
  userRole?: number;
  waist?: number;
  weight?: number;
  whatsApp?: string;
}

/**
 * Default Organize Employee Form Model
 */
export const defaultOrganizeEmployeeModel: OrganizeEmployeeModel = {
  id: "",
  account: "",
  address: "",
  areaCode: "",
  avatar: "",
  chest: 0,
  cup: 0,
  dateOfBirth: 0n,
  email: "",
  expirationDate: 0n,
  firstName: "",
  height: 0,
  hip: 0,
  lastName: "",
  middleName: "",
  mobile: "",
  nationality: "",
  nationalityId: "",
  onboardingTime: 0n,
  organizeId: "",
  password: "",
  position: "",
  referId: "",
  referName: "",
  resign: 0,
  salt: "",
  sex: 0,
  skinColor: "",
  state: 0,
  tiktokAccount: "",
  tiktokName: "",
  timeOfLeaving: 0n,
  timeZoneId: "",
  userRole: 0,
  waist: 0,
  weight: 0,
  whatsApp: "",
};

/**
 * Organize Employee
 */
export const useOrganizeEmployeeStore = CreatePageStore<OrganizeEmployeeModel>(
  "organizeEmployee",
  defaultOrganizeEmployeeModel,
);
