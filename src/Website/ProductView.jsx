import React, { useContext, useState } from 'react'
import { WebsiteContext } from './Contexts/WebsiteContext'

import toast, { Toaster } from 'react-hot-toast';


export const ProductView = () => {
    const {addToCart,toggleCartSide} =useContext(WebsiteContext); 
      // State to track selected size and color
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    "https://readymadeui.com/images/product6.webp"
  );

  const images = [
    "https://readymadeui.com/images/product6.webp",
    "https://readymadeui.com/images/product8.webp",
    "https://readymadeui.com/images/product5.webp",
    "https://readymadeui.com/images/product7.webp",
  ];

  const handleAddToCart = () => {
    
    let message = "";
    if (selectedSize && selectedColor) {
        message = "Added Successfully";
        toast(message, {
            duration: 4000,
            position: 'top-right',
            className: '',
            icon: '🛒',
            iconTheme: {
              primary: '#f00',
              secondary: '#f00',
            },
          });
      addToCart();
      toggleCartSide()
   
    }else{
        if(!selectedSize){
            message ='Select Size.';
        }
        if(!selectedColor){
            message ='Select Color';
        }

        toast(message, {
            duration: 4000,
            position: 'top-right',
            className: '',
            icon: '❌',
            iconTheme: {
              primary: '#f00',
              secondary: '#f00',
            },
          });

        

    }
  };
  return (
    <>
        <div class="font-sans">
          <div class="p-4 lg:max-w-5xl max-w-lg mx-auto">
              <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">

              <div class="w-full lg:sticky top-0 text-center">
              <div className="lg:h-[500px]">
        <img
          src={selectedImage}
          alt="Selected Product"
          className="lg:w-11/12 w-full h-full rounded-md object-cover object-top"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-start mx-auto mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Product ${index + 1}`}
            className={`w-16 cursor-pointer rounded-md ${
              selectedImage === image ? "outline outline-blue-500" : ""
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
                    </div>

                  <div>
                      <h2 class="text-2xl font-bold text-gray-800">Adjective Attire | T-shirt</h2>
                      <div class="flex flex-wrap gap-4 mt-4">
                          <p class="text-gray-800 text-xl font-bold">$12</p>
                          <p class="text-gray-400 text-xl"><strike>$16</strike> <span class="text-sm ml-1.5">Tax included</span></p>
                      </div>

                      <div class="flex space-x-2 mt-4">
                          <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg class="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                      </div>

                      <div class="mt-8">
                          <h3 class="text-xl font-bold text-gray-800">Sizes</h3>
                          <div class="flex flex-wrap gap-4 mt-4">
                            
                          {["SM", "MD", "LG", "XL"].map((size) => (
                                        <button
                                        key={size}
                                        type="button"
                                        className={`w-10 h-10 border-2 ${
                                            selectedSize === size ? "border-blue-600" : "hover:border-blue-600"
                                        } font-semibold text-sm rounded-full flex items-center justify-center shrink-0`}
                                        onClick={() => setSelectedSize(size)}
                                        >
                                        {size}
                                        </button>
                                    ))}
                            
                            </div>
                      </div>
                      <div class="mt-8">
                            <h3 class="text-xl font-bold text-gray-800">Choose a Color</h3>
                            <div class="flex flex-wrap gap-3 mt-4">
                            {[
                                { color: "black", bg: "bg-black" },
                                { color: "gray", bg: "bg-gray-300" },
                                { color: "white", bg: "bg-gray-100" },
                                { color: "blue", bg: "bg-blue-400" },
                            ].map(({ color, bg }) => (
                                <button
                                key={color}
                                type="button"
                                className={`w-10 h-10 ${bg} border-2 ${
                                    selectedColor === color
                                    ? "border-gray-800"
                                    : "border-white hover:border-gray-800"
                                } rounded-full shrink-0 transition-all`}
                                onClick={() => setSelectedColor(color)}
                                />
                            ))}
                                                
                              
                              
                              </div>
                        </div>

                      <button type="button" onClick={handleAddToCart} class="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md">Add to cart</button>

                      <div class="mt-8">
                          <h3 class="text-xl font-bold text-gray-800">About the item</h3>
                          <ul class="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                              <li>A gray t-shirt is a wardrobe essential because it is so versatile.</li>
                              <li>Available in a wide range of sizes, from extra small to extra large, and even in tall and petite sizes.</li>
                              <li>This is easy to care for. They can usually be machine-washed and dried on low heat.</li>
                              <li>You can add your own designs, paintings, or embroidery to make it your own.</li>
                          </ul>
                      </div>

                      <div class="mt-8">
                          <h3 class="text-xl font-bold text-gray-800">Reviews(10)</h3>
                          <div class="space-y-3 mt-4">
                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">5.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-2/3 h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">66%</p>
                              </div>

                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">4.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-1/3 h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">33%</p>
                              </div>

                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">3.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-1/6 h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">16%</p>
                              </div>

                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">2.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-1/12 h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">8%</p>
                              </div>

                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">1.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-[6%] h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">6%</p>
                              </div>
                          </div>

                          <button type="button" class="w-full mt-8 px-6 py-2.5 border border-blue-600 bg-transparent text-gray-800 text-sm font-semibold rounded-md">Read all reviews</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      

      <Toaster />


    </>

  )
}
