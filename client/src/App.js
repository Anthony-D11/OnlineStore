import React, {useEffect, useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])
 
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      json => {
        setBackendData(json)
      }
    )
  }, [])

  return (
    <div>
      {backendData.msg}


    </div>
  )
}

export default App