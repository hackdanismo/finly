import { useState } from 'react'
import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
export function AppLayout({ children }: { children: ReactNode }) { const [open, setOpen] = useState(false); return <div className="app-shell"><Sidebar open={open} onClose={() => setOpen(false)} /><main className="main-content"><Header onMenuClick={() => setOpen(true)} />{children}</main></div> }
