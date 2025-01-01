import React, { useEffect, useRef, useState } from 'react'
import { ProductCard } from '../../Componenets/Product/ProductCard'
import Modal from '../../Componenets/Modal/Modal';
import { AddProductToCartModal } from '../../Componenets/Product/AddProductToCartModal';

export const Products = () => {
  const [products, setProducts] = useState(Array.from({ length: 10 })); // Initial 20 products

  
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef();

  const loadMoreProducts = () => {
    setIsLoading(true);

    // Simulating an API call with a timeout
    setTimeout(() => {
      const newProducts = Array.from({ length: 10 }); // Mock 20 new products
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setIsLoading(false);
    }, 1000); // Delay to simulate network request
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);



  return (
    <div className="font-sans py-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center">
        For You
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {products.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
      <div
        ref={observerRef}
        className="h-10 flex justify-center items-center text-gray-600 mt-4"
      >
        {isLoading ?  
        
        
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600" viewBox="0 0 24 24">
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          data-original="#000000" />
      </svg>
      
      : "Scroll to load more"}
      </div>
    </div>
  );
}
