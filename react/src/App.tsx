import './App.css'
import { RotorPanel } from './components/RotorPanel'
import { PlugboardPanel } from './components/PlugboardPanel'
import { Keyboard } from './components/Keyboard'
import { IOPanel } from './components/IOPanel'
import { useEnigmaMachine } from './hooks/useEnigmaMachine'

function App() {
  const enigma = useEnigmaMachine();

  return (
    <div className="container">
      <h1>Enigma Machine</h1>

      <RotorPanel enigma={enigma} />

      <div className="card">
        <Keyboard enigma={enigma} />
      </div>

      <PlugboardPanel enigma={enigma} />

      <IOPanel enigma={enigma} />
    </div>
  )
}

export default App
