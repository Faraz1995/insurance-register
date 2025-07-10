import { useState } from 'react'
import { sendOtpApi } from './api'
import { parsePhoneNumber } from './util'
import PhoneNumberStep from './container/PhoneNumberStep'
import { Steps, type NameState } from './util/types'
import OtepStep from './container/OtpStep'
import NameStep from './container/NameStep'
import { useForm } from 'react-hook-form'
import InfoStep from './container/InfoStep'
import { toast } from 'react-toastify'

function App() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [step, setStep] = useState(Steps.INFO)
  const [loadingPhoneNumber, setLoadingPhoneNumber] = useState(false)

  const nameForm = useForm<NameState>()

  const submitPhone = () => {
    if (phoneNumber) {
      const finalNumber = parsePhoneNumber(phoneNumber)
      setLoadingPhoneNumber(true)
      sendOtpApi(
        { phone_number: finalNumber },
        () => {
          setLoadingPhoneNumber(false)
          setStep(Steps.OTP)
        },
        (e) => {
          setLoadingPhoneNumber(false)
          toast.error(e.response?.data?.error_details?.fa_details || 'خطایی رخ داده است')
        }
      )
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  const renderStepForm = () => {
    switch (step) {
      case Steps.PHONE_NUMBER:
        return (
          <PhoneNumberStep
            phoneNumber={phoneNumber}
            handlePhoneChange={handlePhoneChange}
            submitPhone={submitPhone}
            loading={loadingPhoneNumber}
          />
        )
      case Steps.OTP:
        return <OtepStep phoneNumber={phoneNumber} setStep={setStep} />
      case Steps.NAME:
        return <NameStep form={nameForm} setStep={setStep} />
      case Steps.INFO:
        return (
          <InfoStep nameForm={nameForm} setStep={setStep} phoneNumber={phoneNumber} />
        )
      default:
        return (
          <PhoneNumberStep
            phoneNumber={phoneNumber}
            handlePhoneChange={handlePhoneChange}
            submitPhone={submitPhone}
          />
        )
    }
  }

  return (
    <>
      <div className='relative bg-separ-primary h-52 w-full rounded-b-2xl flex flex-col items-center'>
        <img src='../public/separ.svg' alt='' className='w-[47px] h-[62px] mt-4' />
        <div className='bg-white absolute top-3/4 px-6 py-8 text-center rounded-md shadow-[0px_3px_6px_0px_#1C487029]'>
          {renderStepForm()}
        </div>
      </div>
    </>
  )
}

export default App
