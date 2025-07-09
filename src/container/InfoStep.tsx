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
import { countryListApi, insuranceBranchApi, provinceListApi } from '../api'
import PhoneInput from '../components/PhoneInput'
import RadioInput from '../components/RadioInput'

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
    // setStep(Steps.INFO)
    console.log('submit')
  }

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

  console.log(form.getValues())

  return (
    <form onSubmit={handleSubmit(submitName)}>
      <TextInput
        label={'کد نمایندگی'}
        placeholder='کد نمایندگی را وارد کنید'
        {...register('agent_code', {
          required: 'کد نمایندگی را وارد کنید'
        })}
      />

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

      <PhoneInput
        label='تلفن ثابت'
        className='mt-4'
        defaultCountryCode='021'
        {...register('phone', {
          required: 'تلفن ثابت اجباری است'
        })}
      />

      <div className='flex gap-6 mt-4'>
        <p>نوع نمایندگی</p>
        <RadioInput label='حقیقی' value='real' {...register('agency_type')} />
        <RadioInput label='حقوقی' value='legal' {...register('agency_type')} />
      </div>

      {agency_type === 'legal' && (
        <TextInput
          label='نام نمایندگی'
          placeholder='نام نمایندگی را وارد کنید'
          {...register('Name', {
            required: 'نام نمایندگی را وارد کنید'
          })}
          className='mt-4'
        />
      )}

      <Button
        classNames='mt-7'
        disabled={Object.keys(errors).length > 0}
        onClick={handleSubmit(submitName)}
      >
        ادامه
      </Button>
    </form>
  )
}

export default InfoStep
