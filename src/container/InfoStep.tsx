import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import {
  Steps,
  type CountryResponse,
  type InfoState,
  type InsuranceBranchResponse,
  type ProvinceReponse
} from '../util/types'
import TextInput from '../components/TextInput'
import { type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import SelectInput from '../components/SelectInput'
import {
  countryListApi,
  insuranceBranchApi,
  provinceListApi,
  validateAgencyCodeApi
} from '../api'
import PhoneInput from '../components/PhoneInput'
import RadioInput from '../components/RadioInput'
import CheckIcon from '../assets/CheckIcon'
import CrossIcon from '../assets/CrossIcon'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<Steps>>
  form: UseFormReturn<InfoState>
}

type Options = {
  label: string
  value: string
}

const InfoStep = ({ form }: Props) => {
  const [provinceList, setProvinceList] = useState<Options[]>([])
  const [countryList, setCountryList] = useState<Options[]>([])
  const [inquiryAgentResult, setInquiryAgentResult] = useState<'valid' | 'invalid' | ''>(
    ''
  )

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
        }
      )
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = form

  const submitName: SubmitHandler<InfoState> = () => {
    console.log('here submit************')
    console.log('submitName')
    // setStep(Steps.INFO)
    console.log(form.getValues())
  }

  console.log(errors)

  const provinceId = watch('province')
  const agency_type = watch('agency_type')

  useEffect(() => {
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
          console.log(e)
        }
      )
    }
  }, [provinceId])

  const fetchBranches = async (
    query: string
  ): Promise<{ label: string; value: string }[]> => {
    if (!provinceId && !query) return []

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
  }

  const checkAgencyCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAgencyCodeApi(
      { agent_code: e.target.value },
      (res) => {
        setInquiryAgentResult('valid')
        console.log(res)
      },
      (e) => {
        setInquiryAgentResult('invalid')
        console.log(e)
      }
    )
  }

  console.log(watch('insurance_branch'))
  console.log(watch('phone'))

  return (
    <form onSubmit={handleSubmit(submitName)}>
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
        onClick={handleSubmit(submitName)}
      >
        ادامه
      </Button>
    </form>
  )
}

export default InfoStep
