import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
const queryClient = new QueryClient()
  return (
    <>

<QueryClientProvider client={queryClient}>

<div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
      </QueryClientProvider>

      

    
    
    
    </>

  )
}
