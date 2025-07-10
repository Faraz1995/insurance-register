import axios, { AxiosError, type AxiosResponse } from 'axios'

type SendOtpPayload = {
  phone_number: string
}

type ValidateOtpPayload = {
  phone_number: string
  code: string
}

export const sendOtpApi = (
  payload: SendOtpPayload,
  success: (res: AxiosResponse) => void,
  error: (err: AxiosError) => void
) => {
  const url =
    'https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/create_otp/'

  axios({
    url,
    method: 'post',
    data: payload
  })
    .then(success)
    .catch(error)
}

export const validateOtpApi = (
  payload: ValidateOtpPayload,
  success: (res: AxiosResponse) => void,
  error: (err: AxiosError) => void
) => {
  const url =
    'https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/validate_otp/'
  axios({
    url,
    method: 'post',
    data: payload
  })
    .then(success)
    .catch(error)
}

export const validateAgencyCodeApi = (
  payload: {
    agent_code: string
  },
  success: (res: AxiosResponse) => void,
  error: (err: AxiosError) => void
) => {
  const url =
    'https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/'

  axios({
    url,
    method: 'post',
    data: payload
  })
    .then(success)
    .catch(error)
}

export const provinceListApi = (
  success: (res: AxiosResponse) => void,
  error: (err: AxiosError) => void
) => {
  const url = 'https://stage.api.sanaap.co/base/provinces_wop/'

  axios({
    url,
    method: 'get'
  })
    .then(success)
    .catch(error)
}

export const countryListApi = (
  province: string,
  success: (res: AxiosResponse) => void,
  error: (err: AxiosError) => void
) => {
  const url = 'https://stage.api.sanaap.co/base/counties_wop/'

  axios({
    url,
    method: 'get',
    params: {
      province
    }
  })
    .then(success)
    .catch(error)
}

export const insuranceBranchApi = (
  params: {
    name: string
    province: string
  },
  success: (res: AxiosResponse) => void,
  error: (err: AxiosError) => void
) => {
  const url =
    'https://stage.api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/'
  const requestParams = { ...params, insurance: 'DEY' }

  axios({
    url,
    method: 'get',
    params: requestParams
  })
    .then(success)
    .catch(error)
}
