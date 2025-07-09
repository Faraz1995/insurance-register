import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { OtpInput } from '../components/OtpInput'
import { Steps } from '../util/types'
import { humanizeTime, parsePhoneNumber } from '../util'
import { validateOtpApi } from '../api'

type Props = {
  phoneNumber: string
  setStep: React.Dispatch<React.SetStateAction<Steps>>
}

const OtepStep = ({ phoneNumber, setStep }: Props) => {
  const [otp, setOtp] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [timeLeft, setTimeLeft] = useState<number>(120)

  useEffect(() => {
    let intervalId: number | undefined = undefined

    intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  const goToPhoneNumberStep = () => {
    setStep(Steps.PHONE_NUMBER)
  }

  const validateOtp = () => {
    setIsLoading(true)
    validateOtpApi(
      { phone_number: parsePhoneNumber(phoneNumber), code: otp },
      () => {
        setIsLoading(false)
        setStep(Steps.NAME)
      },
      () => {
        setIsLoading(false)
        setHasError(true)
      }
    )
  }
  return (
    <div>
      <p className='text-lg font-semibold text-gray-800 mb-2'>کد تایید را وارد نمایید.</p>
      <div className='flex justify-center items-center gap-2 mb-6'>
        <img
          onClick={goToPhoneNumberStep}
          className='cursor-pointer'
          src='../../public/pencil.svg'
          alt=''
        />
        <p dir='ltr' className='text-xs text-gray-500'>
          {phoneNumber}
        </p>
      </div>
      <OtpInput value={otp} onChange={setOtp} error={hasError} />
      <div
        className='cursor-pointer'
        onClick={() => {
          if (timeLeft === 0) {
            goToPhoneNumberStep()
          }
        }}
      >
        <p className='text-xs mt-4 text-gray-500'>
          ارسال مجدد کد {humanizeTime(timeLeft)}
        </p>
      </div>

      <Button
        loading={isLoading}
        disabled={otp.length !== 5}
        classNames='mt-7'
        onClick={validateOtp}
      >
        ادامه
      </Button>
    </div>
  )
}

export default OtepStep
