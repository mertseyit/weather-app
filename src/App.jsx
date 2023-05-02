import React from 'react'
import { WeatherProvider } from './context/WeatherContext'
import Search from './components/Search'
import Table from './components/Table'
import Box from './components/Box'
const App = () => {
  return (
    <WeatherProvider>
      <Box>
        <Search />
        <Table />
      </Box>
    </WeatherProvider>
  )
}

export default App