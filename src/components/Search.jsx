import React, { useContext, useState } from 'react'
import { FcSearch } from "react-icons/fc";
import { WeatherContext } from '../context/WeatherContext';
const Search = () => {
    const { SearchString, errorMessage, setErrorMessage } = useContext(WeatherContext)
    const [string, setString] = useState("")
    setTimeout(() => setErrorMessage(""),3000)
    const handleSubmit = (e) => {
        e.preventDefault()
        setString(e.target.value)
    }
    return (
        <div className=' w-full flex flex-col'>
            <div className='flex w-full'>
                <input onChange={(e) => handleSubmit(e)} type="text" placeholder='Hava durumunu öğrenmek istediğiniz lokasyonu giriniz' name="country" id="country" className='w-full border focus:outline-none p-2 rounded-lg shadow-md shadow-blue-100' />
                <button onClick={() => SearchString(string)} className='px-4 ml-2 bg-blue-400 rounded-lg'><FcSearch className='text-xl' /></button>
            </div>

            <div className='mt-4 border p-2'>
                <h2 className='text-lg text-red-500'>{errorMessage}</h2>
            </div>
        </div>
    )
}

export default Search