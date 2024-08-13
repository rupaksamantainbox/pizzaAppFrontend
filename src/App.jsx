import { useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import NotFound from './pages/NotFound'
import Denied from './pages/Denied'
import AddProduct from './pages/admin/AddProduct'
import ProductDetails from './pages/products/ProductDetails'
import CartDetails from './pages/cart/CartDetails'
import Order from './pages/order/Order'
import OrderSuccess from './pages/order/OrderSuccess'
import RequireAuth from './components/icons/auth/RequireAuth'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth/signup' element={<Signup/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/denied' element={<Denied/>}/>
        <Route path='/admin/addProduct' element={<AddProduct/>}/>
        <Route path='/product/:productId' element={<ProductDetails/>}/>

        <Route element={<RequireAuth/>}>
        <Route path='/cart' element={<CartDetails/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/order/success' element={<OrderSuccess />} />
        </Route>
        
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
