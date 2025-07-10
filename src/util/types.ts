export enum Steps {
  PHONE_NUMBER = 'phoneNumber',
  OTP = 'otp',
  NAME = 'name',
  INFO = 'info',
  STATUS = 'status'
}

export type NameState = {
  firstName: string
  lastName: string
}

export type InfoState = {
  agency_type: 'real' | 'legal'
  agent_code: string
  city_code: string
  country: string
  province: string
  insurance_branch: string
  phone_number: string
  phone: string
  Name?: string
  address: string
}

export type CreatorUser = {
  id: number
  first_name: string
  last_name: string
  username: string
}

export type ProvinceReponse = {
  id: number
  is_active: boolean
  name: string
  code: string
  name_split: string
  creator_user: CreatorUser
  country: number
}

export type CountryResponse = {
  id: number
  is_active: boolean
  name: string
  fanavaran_code: string
  name_split: string
  province: ProvinceReponse
  creator_user: CreatorUser
}

export type InsuranceBranchResponse = {
  id: number
  name: string
  insurance: number
  province: number
  county: number
}
