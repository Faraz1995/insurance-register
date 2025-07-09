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
