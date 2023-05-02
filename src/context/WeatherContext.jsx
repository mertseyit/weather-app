import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WeatherContext = createContext({})

export const WeatherProvider = ({ children }) => {
    const apiURL = "https://api.weatherapi.com/v1/forecast.json?key=5e79f12862dc4a25ab280550230105&q=erzincan&days=7&aqi=no&alerts=no"

    const [dailyWeather, setDailyWeather] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("denizli")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        axios.get(apiURL)
            .then(res => {
                setDailyWeather(res.data)
            })
            .catch(err => {
                if (err.code === "ERR_BAD_REQUEST") {
                    setErrorMessage("Hatalı bir ülke veya şehir ismi girdiniz")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=5e79f12862dc4a25ab280550230105&q=${search}&days=7&aqi=no&alerts=no`)
            .then(res => {
                setDailyWeather(res.data)
            })
            .catch(err => {
                if (err.code === "ERR_BAD_REQUEST") {
                    setErrorMessage("Hatalı bir ülke veya şehir ismi girdiniz")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [search])

    const SearchString = (value) => {
        setSearch(value)
    }

    // console.log(location)
    return (
        <WeatherContext.Provider value={{
            dailyWeather,
            isLoading,
            SearchString,
            errorMessage,
            setErrorMessage
        }}>
            {children}
        </WeatherContext.Provider>
    )
}