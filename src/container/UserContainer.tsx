import { useNavigate } from 'react-router'
import BottomDrawer from '../components/BottomDrawer'
import Button from '../components/Button'
import { useEffect } from 'react'
import { inquiryUserApi } from '../api'
import { toast } from 'react-toastify'

const UserContainer = () => {
  const navigate = useNavigate()
  const goToRegisterUser = () => {
    navigate('/')
  }

  useEffect(() => {
    inquiryUserApi(
      (res) => {
        console.log(res)
      },
      (e) => {
        toast.error(e.response?.data?.error_details?.fa_details)
      }
    )
  }, [])
  return (
    <div className='h-screen w-full bg-separ-primary flex flex-col items-center'>
      <img src='../../public/separ.svg' alt='' className='w-[47px] h-[62px] mt-4' />
      <BottomDrawer isOpen={true} onClose={() => {}}>
        <div>
          <p className='font-bold text-lg'>نماینده محترم</p>
          <p className='mt-4 text-sm'>
            درخواست ثبت نام شما در حال بررسی است، در صورت تایید اطلاعات ، اپلیکیشن مورد
            نظر فعال می شود
          </p>
          <Button classNames='mt-6' onClick={goToRegisterUser}>
            <p>ورود با حساب کاربری دیگر</p>
          </Button>
        </div>
      </BottomDrawer>
    </div>
  )
}

export default UserContainer
