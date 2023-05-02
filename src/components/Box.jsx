import React, { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'

const Box = ({ children }) => {
  const { isLoading } = useContext(WeatherContext)
  if (isLoading) {
    return (
      <div>Yükleniyor</div>
    )
  } else {
    return (
      <div className='flex justify-center w-full lg:h-screen+20 h-screen+30'>
        <div className='lg:px-20 px-2 lg:w-5/6 w-full bg-blue-50 p-2 m-2 shadow-xl rounded-lg border flex flex-col items-center relative'>
          {children}
          <div className='absolute bottom-3 text-xs'>
            Created by <a href="https://www.linkedin.com/in/mert-seyit/" className='text-blue-400' target='_blank'>Mert Seyit YILMAZ</a>
          </div>
        </div>
      </div>
    )
  }

}

export default Box