import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Sygma } from '@buildwithsygma/sygma-sdk-core'
import bridgesetup from './bridgesetup.json'

function App() {
  const [count, setCount] = useState(0)
  const [sygmaInstance, setSygmaInstance] = useState(undefined);
  const [metaIsConnected, setMetaIsConnected] = useState(false);

console.log("Bridge Setup", bridgesetup)
console.log("Sygma instance", sygmaInstance)

    useEffect(
      () => {
      const setup = { bridgeSetupList: bridgesetup.SYGMA.chains };
      const sygma = new Sygma(setup);
  
      setSygmaInstance(sygma);
    }, []);

    useEffect(() => {
      if (window.ethereum !== undefined) {
        void window.ethereum._metamask.isUnlocked().then((d) => {
          console.log("is metamask unlocked?", d);
          setMetaIsConnected(d);
        });
      }
if (!metaIsConnected){
  window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log("request to unlock metamask", result);
          const data = sygmaInstance?.initializeConnectionFromWeb3Provider(
            window.ethereum
          );
          setSygmaInstance(data);
        })
}
      
    }, []);

    const getAddress = async () => {
      const address = await sygmaInstance.getSignerAddress('chain1')
      console.log("🚀 ~ file: App.tsx:160 ~ getAddress ~ address:", address)
    }
  
    useEffect(() => {
      if(metaIsConnected && sygmaInstance !== undefined){
        getAddress()
      }
    }, [sygmaInstance]);
    
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
