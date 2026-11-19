import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import './styles/variables.css'
import './styles/global.css'
import './styles/layout.css'
import './styles/dashboard.css'
import './styles/payments.css'
import { Payments } from './pages/Payments'
import { useEffect, useState } from 'react'

function App() { const [hash, setHash] = useState(window.location.hash); useEffect(() => { const onHashChange = () => setHash(window.location.hash); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange) }, []); return <AppLayout>{hash === '#payments' ? <Payments /> : <Dashboard />}</AppLayout> }

export default App
