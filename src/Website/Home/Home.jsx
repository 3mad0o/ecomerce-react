import React from 'react'
import { Slider } from './Componenets/Slider'
import './Index.css'
import { Products } from './Componenets/Products'
import { CategoryList } from './Componenets/CategoryList'
export const Home = () => {
  return (
  <>
   <div className="container mx-auto">
   <Slider />
   <CategoryList />
   <Products />

</div>
  
  
  
  </>
  )
}
