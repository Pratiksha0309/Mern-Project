import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClinet = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClinet}>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
