import React, { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import {
  Steps,
  type CountryResponse,
  type InfoState,
  type InsuranceBranchResponse,
  type NameState,
  type ProvinceReponse
} from '../util/types'
import TextInput from '../components/TextInput'
import { useForm, type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import SelectInput from '../components/SelectInput'
import {
  countryListApi,
  insuranceBranchApi,
  provinceListApi,
  registerUserApi,
  validateAgencyCodeApi
} from '../api'
import PhoneInput from '../components/PhoneInput'
import RadioInput from '../components/RadioInput'
import CheckIcon from '../assets/CheckIcon'
import CrossIcon from '../assets/CrossIcon'
import { parsePhoneNumber } from '../util'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<Steps>>
  nameForm: UseFormReturn<NameState>
  phoneNumber: string
}

type Options = {
  label: string
  value: string
}

const InfoStep = ({ nameForm, phoneNumber }: Props) => {
  const [provinceList, setProvinceList] = useState<Options[]>([])
  const [countryList, setCountryList] = useState<Options[]>([])
  const [inquiryAgentResult, setInquiryAgentResult] = useState<'valid' | 'invalid' | ''>(
    ''
  )

  const navigate = useNavigate()

  const infoForm = useForm<InfoState>({
    defaultValues: {
      province: '',
      country: ''
    }
  })

  useEffect(() => {
    if (provinceList.length === 0) {
      provinceListApi(
        (res) => {
          const list = res.data.map((item: ProvinceReponse) => ({
            label: item.name,
            value: item.id
          }))
          setProvinceList(list)
        },
        (e) => {
          console.log(e)
          toast.error(e.response?.data?.error_details?.fa_details || 'خطایی رخ داده است')
        }
      )
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = infoForm

  const insurance_branch = infoForm.watch('insurance_branch')
  const registerUser: SubmitHandler<InfoState> = () => {
    const nameInfo = nameForm.getValues()
    const infos = infoForm.getValues()

    const payload = {
      agent_code: infos.agent_code,
      phone: infos.phone,
      province: infos.province,
      agency_type: infos.agency_type,
      Name: infos.Name,
      first_name: nameInfo.firstName,
      last_name: nameInfo.lastName,
      phone_number: parsePhoneNumber(phoneNumber),
      insurance_branch,
      county: infos.country,
      address: 'آدرس',
      city_code: infos.phone.substring(0, 3)
    }
    registerUserApi(
      payload,
      (res) => {
        const { access, refresh } = res.data.response
        Cookies.set('access_token', access)
        Cookies.set('refresh_token', refresh)
        navigate('/user')
      },
      (e) => {
        toast.error(e.response?.data?.error_details?.fa_details || 'خطایی رخ داده است')
      }
    )
  }

  const provinceId = watch('province')
  const agency_type = watch('agency_type')

  useEffect(() => {
    infoForm.resetField('country')
    if (provinceId) {
      countryListApi(
        provinceId,
        (res) => {
          const list = res.data.map((item: CountryResponse) => ({
            label: item.name,
            value: item.id
          }))
          setCountryList(list)
        },
        (e) => {
          toast.error(e.response?.data?.error_details?.fa_details || 'خطایی رخ داده است')
        }
      )
    }
  }, [provinceId])

  const fetchBranches = useCallback(
    async (query: string): Promise<{ label: string; value: string }[]> => {
      if (!provinceId) {
        return []
      }
      if (!query) {
        return []
      }

      return new Promise((resolve, reject) => {
        insuranceBranchApi(
          {
            name: query,
            province: provinceId
          },
          (res) => {
            const result = res.data?.response?.map((item: InsuranceBranchResponse) => ({
              label: item.name,
              value: item.id
            }))
            resolve(result)
          },
          (err) => {
            console.error('Failed to fetch branches', err)
            reject(err)
          }
        )
      })
    },
    [provinceId]
  ) // Only recreate when provinceId changes

  const checkAgencyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) {
      validateAgencyCodeApi(
        { agent_code: e.target.value },
        () => {
          setInquiryAgentResult('valid')
        },
        (e) => {
          setInquiryAgentResult('invalid')
          toast.warn(e.response?.data?.error_details?.fa_details || 'خطایی رخ داده است')
        }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <TextInput
        label={'کد نمایندگی'}
        placeholder='کد نمایندگی را وارد کنید'
        isLtr
        rightIcon={
          inquiryAgentResult === 'valid' ? (
            <CheckIcon />
          ) : inquiryAgentResult === 'invalid' ? (
            <CrossIcon />
          ) : null
        }
        {...register('agent_code', {
          onBlur: checkAgencyCode,
          required: 'کد نمایندگی را وارد کنید'
        })}
      />
      {errors.agent_code && (
        <p className='mt-1 text-red-500 text-sm'>{errors.agent_code.message}</p>
      )}
      <div>
        <SelectInput
          label='استان'
          placeholder='استان را انتخاب کنید'
          {...register('province', {
            required: 'استان را انتخاب کنید'
          })}
          className='mt-4'
          disabled={provinceList.length === 0}
          options={provinceList}
        />
        {errors.province && (
          <p className='mt-1 text-red-500 text-sm'>{errors.province.message}</p>
        )}
      </div>

      <div>
        <SelectInput
          label='شهر'
          placeholder='شهر را انتخاب کنید'
          {...register('country', {
            required: 'شهر را انتخاب کنید'
          })}
          className='mt-4'
          disabled={countryList.length === 0 && !provinceId}
          options={countryList}
        />
        {errors.country && (
          <p className='mt-1 text-red-500 text-sm'>{errors.country.message}</p>
        )}
      </div>
      <div>
        <SelectInput
          label={'کد نمایندگی'}
          placeholder='کد نمایندگی را وارد کنید'
          {...register('insurance_branch', {
            required: 'کد نمایندگی را وارد کنید'
          })}
          searchable
          fetchOptions={fetchBranches}
          className='mt-4'
        />
        {errors.insurance_branch && (
          <p className='mt-1 text-red-500 text-sm'>{errors.insurance_branch.message}</p>
        )}
      </div>

      <div>
        <PhoneInput
          label='تلفن ثابت'
          className='mt-4'
          defaultCountryCode='021'
          {...register('phone', {
            required: 'تلفن ثابت اجباری است'
          })}
        />
        {errors.phone && (
          <p className='mt-1 text-red-500 text-sm'>{errors.phone.message}</p>
        )}
      </div>

      <div className='flex gap-6 mt-4'>
        <p>نوع نمایندگی</p>
        <RadioInput label='حقیقی' value='real' {...register('agency_type')} />
        <RadioInput label='حقوقی' value='legal' {...register('agency_type')} />
      </div>
      {errors.agency_type && (
        <p className='mt-1 text-red-500 text-sm'>{errors.agency_type.message}</p>
      )}

      {agency_type === 'legal' && (
        <div>
          <TextInput
            label='نام نمایندگی'
            placeholder='نام نمایندگی را وارد کنید'
            {...register('Name', {
              required: 'نام نمایندگی را وارد کنید'
            })}
            className='mt-4'
          />
          {errors.Name && (
            <p className='mt-1 text-red-500 text-sm'>{errors.Name.message}</p>
          )}
        </div>
      )}

      <Button
        classNames='mt-7'
        // disabled={Object.keys(errors).length > 0}
        onClick={handleSubmit(registerUser)}
      >
        ادامه
      </Button>
    </form>
  )
}

export default InfoStep
