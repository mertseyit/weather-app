import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import { FcDown } from "react-icons/fc";

const Table = () => {
  const [locatinon, setLocation] = useState({})
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const { dailyWeather, errorMessage } = useContext(WeatherContext)
  const [currentWeather, setCurrentWeather] = useState([])
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  useEffect(() => {
    if (dailyWeather) {
      setLocation(dailyWeather["location"])
    }
  }, [dailyWeather])

  useEffect(() => {
    if (dailyWeather) {
      setCurrentWeather(dailyWeather["forecast"].forecastday.filter(item => item.date === formattedDate))
    }
  }, [dailyWeather])

  return (
    <div className='mt-10 w-full'>
      <h2 className='my-5 mb-10 text-3xl'>{locatinon.name}</h2>
      <div className='w-full grid lg:grid-rows-1 whitespace-nowrap overflow-x-auto lg:gap-3 gap-1 grid-flow-col'>
        {
          dailyWeather  && dailyWeather.forecast.forecastday.map((data, i) => {
            return (
              <div key={i} className='flex flex-col justify-center items-center'>
                <div className={`w-full ${data.date === formattedDate ? " shadow-lg bg-blue-200" : " "} p-2 rounded-lg border shadow-md shadow-blue-200`}>
                  <span className='w-full block font-semibold'>{days[new Date(data.date).getDay()]}</span>
                  <span className='w-full block text-xs mb-3'>{data.date}</span>
                  <div className='h-40 w-32 relative bg-blue-300 rounded-lg '>
                    <img src={data.day.condition.icon} className='w-full' alt="" />
                    <span className='w-full text-center text-xs font-bold p-1 text-white absolute bottom-0'>{data.day.condition.text}</span>
                  </div>
                </div>
                {i + 1 === dailyWeather.current.is_day ? <FcDown className='text-2xl' /> : null}
              </div>
            )
          })
        }
      </div>
      <div className='mt-6 w-full h-60 bg-blue-100 rounded-lg shadow-md shadow-blue-200 flex whitespace-nowrap overflow-x-auto gap-2 p-3'>
        {
          currentWeather[0] && currentWeather[0].hour.map((item, i) => {
            return (
              <div key={i} className='flex flex-col justify-center items-center h-full rounded-xl bg-gray-50 p-3'>
                <div className='text-xs w-36 font-bold'>{item.time.split(" ")[1]}</div>
                <img src={item.condition.icon} className='w-2/3 border rounded-full shadow-md' alt="" />
                <p className='text-center font-semibold '>{item.condition.text}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Table