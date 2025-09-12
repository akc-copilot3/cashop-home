import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: 1,
    name: "Li-Ning Basketball Shoes",
    description: "High-performance basketball shoes with advanced cushioning",
    price: { retail: 89.99, member: 67.49 },
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  },
  {
    id: 2,
    name: "ANTA Running Shoes", 
    description: "Lightweight running shoes for comfort and performance",
    price: { retail: 79.99, member: 59.99 },
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
  },
  {
    id: 3,
    name: "Haier Smart TV 55\"",
    description: "4K Ultra HD Smart TV with Android system",
    price: { retail: 499.99, member: 374.99 },
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400",
  }
]

export function SimpleProducts() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg">
            Discover quality products from top Chinese brands
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 line-through">
                      ${product.price.retail}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      ${product.price.member}
                    </p>
                  </div>
                </div>
                <Button className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}