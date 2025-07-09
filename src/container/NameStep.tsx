import React from 'react'
import Button from '../components/Button'
import { Steps, type NameState } from '../util/types'
import TextInput from '../components/TextInput'
import { type SubmitHandler, type UseFormReturn } from 'react-hook-form'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<Steps>>
  form: UseFormReturn<NameState>
}

const NameStep = ({ form, setStep }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form

  const submitName: SubmitHandler<NameState> = () => {
    setStep(Steps.INFO)
  }

  return (
    <form onSubmit={handleSubmit(submitName)}>
      <TextInput
        label={'نام'}
        placeholder='نام را وارد کنید'
        {...register('firstName', { required: 'First name is required' })}
      />
      <TextInput
        label={'نام خانوادگی'}
        placeholder='نام خانوادگی را وارد کنید'
        {...register('lastName', { required: 'First name is required' })}
        className='mt-8'
      />
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

export default NameStep
