import {useState, useEffect} from 'react'
import api from '../services/api'

const useSerieTurma = () => {

  const [turmas, setTurmas] = useState([])
  const [series, setSeries] = useState([])

  const getInitialData = async () => {
    const responseSeries = await api.getSeries()
    const responseTurmas = await api.getTurmas()

    if(responseSeries.ok && responseTurmas.ok){
      setTurmas(responseTurmas.data)
      setSeries(responseSeries.data)
    }
  }

  useEffect(() => {
    getInitialData()  
  }, [])

  return {
    turmas, 
    series
  }
}

export default useSerieTurma