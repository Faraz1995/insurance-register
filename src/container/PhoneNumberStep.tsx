import Button from '../components/Button'
import PhoneInput from '../components/PhoneInput'

type Props = {
  phoneNumber: string
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  submitPhone: () => void
  loading?: boolean
}

const PhoneNumberStep = ({
  phoneNumber,
  handlePhoneChange,
  submitPhone,
  loading
}: Props) => {
  return (
    <div>
      <p className='text-lg font-semibold text-gray-800 mb-2'>
        شماره موبایل خود را وارد نمایید.
      </p>
      <p className='text-xs text-gray-500 mb-6'>کد تایید برای شما ارسال خواهد شد.</p>
      <PhoneInput
        label='تلفن همراه'
        placeholder='XXX - XXX - XXXX'
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
      <Button loading={loading} classNames='mt-7' onClick={submitPhone}>
        ادامه
      </Button>
    </div>
  )
}

export default PhoneNumberStep
