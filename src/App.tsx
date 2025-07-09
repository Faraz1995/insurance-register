import { useState } from 'react'
import { sendOtpApi } from './api'
import { parsePhoneNumber } from './util'
import PhoneNumberStep from './container/PhoneNumberStep'
import { Steps, type NameState } from './util/types'
import OtepStep from './container/OtpStep'
import NameStep from './container/NameStep'
import { useForm } from 'react-hook-form'

function App() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [step, setStep] = useState(Steps.NAME)
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
        (err) => {
          setLoadingPhoneNumber(false)
          console.log(err)
        }
      )
    }
  }

  const handlePhoneChange = (fullPhoneNumber: string) => {
    setPhoneNumber(fullPhoneNumber)
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
