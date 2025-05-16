import { VendingMachineContextProvider } from './contexts/VendingMachineContextProvider'
import VendingMachinePage from './pages/VendingMachinePage'

function App() {
  return (
    <VendingMachineContextProvider>
      <VendingMachinePage />
    </VendingMachineContextProvider>
  )
}

export default App
