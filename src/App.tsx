import { useState } from 'react'
import Button from './components/Button'
import PhoneInput from './components/MobileInput'

function App() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const submitPhone = () => {
    console.log(phoneNumber)
  }

  const handlePhoneChange = (fullPhoneNumber: string) => {
    setPhoneNumber(fullPhoneNumber)
  }

  return (
    <>
      <div className='relative bg-separ-primary h-52 w-full rounded-b-2xl flex flex-col items-center'>
        <img src='../public/separ.svg' alt='' className='w-[47px] h-[62px] mt-4' />
        <div className='bg-white absolute top-3/4 px-6 py-8 text-center rounded-md shadow-[0px_3px_6px_0px_#1C487029]'>
          <p className='text-lg font-semibold text-gray-800 mb-2'>
            .شماره موبایل خود را وارد نمایید
          </p>
          <p className='text-xs text-gray-500 mb-6'>.کد تایید برای شما ارسال خواهد شد</p>
          <PhoneInput
            label='تلفن همراه'
            placeholder='XXX - XXX - XXXX'
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
          <Button classNames='mt-7' onClick={submitPhone}>
            ادامه
          </Button>
        </div>
      </div>
    </>
  )
}

export default App
