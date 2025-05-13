"use client"

import { useState } from "react"
import { FaSearch, FaPlus, FaEdit, FaTrash, FaUtensils, FaCoffee, FaIceCream, FaGlassMartini } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const MenuManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock categories
  const categories = [
    { id: "meals", name: "Meals", icon: <FaUtensils /> },
    { id: "drinks", name: "Drinks", icon: <FaGlassMartini /> },
    { id: "desserts", name: "Desserts", icon: <FaIceCream /> },
    { id: "sides", name: "Sides", icon: <FaCoffee /> },
  ]

  // Mock menu items
  const menuItems = [
    {
      id: 1,
      name: "Whopper Burger",
      category: "meals",
      price: "$5.99",
      description: "Flame-grilled beef patty topped with tomatoes, lettuce, mayo, ketchup, pickles, and onions.",
      image: "https://via.placeholder.com/100",
      available: true,
    },
    {
      id: 2,
      name: "Chicken Royale",
      category: "meals",
      price: "$4.99",
      description: "Crispy chicken fillet topped with lettuce and mayo.",
      image: "https://via.placeholder.com/100",
      available: true,
    },
    {
      id: 3,
      name: "Fries (Large)",
      category: "sides",
      price: "$2.99",
      description: "Crispy golden fries, perfectly salted.",
      image: "https://via.placeholder.com/100",
      available: true,
    },
    {
      id: 4,
      name: "Onion Rings",
      category: "sides",
      price: "$2.49",
      description: "Crispy battered onion rings.",
      image: "https://via.placeholder.com/100",
      available: false,
    },
    {
      id: 5,
      name: "Coca-Cola",
      category: "drinks",
      price: "$1.99",
      description: "Refreshing cola drink.",
      image: "https://via.placeholder.com/100",
      available: true,
    },
    {
      id: 6,
      name: "Chocolate Sundae",
      category: "desserts",
      price: "$2.29",
      description: "Soft serve ice cream with chocolate sauce.",
      image: "https://via.placeholder.com/100",
      available: true,
    },
    {
      id: 7,
      name: "Apple Pie",
      category: "desserts",
      price: "$1.79",
      description: "Warm apple pie with a flaky crust.",
      image: "https://via.placeholder.com/100",
      available: true,
    },
    {
      id: 8,
      name: "Sprite",
      category: "drinks",
      price: "$1.99",
      description: "Refreshing lemon-lime soda.",
      image: "https://via.placeholder.com/100",
      available: true,
    },
  ]

  // Filter menu items based on search term and category filter
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Get category name by id
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : categoryId
  }

  // Get category icon by id
  const getCategoryIcon = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.icon : <FaUtensils />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <Button icon={<FaPlus />}>Add New Item</Button>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 space-x-2">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`px-4 py-2 rounded-full flex items-center whitespace-nowrap ${
            categoryFilter === "all" ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCategoryFilter(category.id)}
            className={`px-4 py-2 rounded-full flex items-center whitespace-nowrap ${
              categoryFilter === category.id ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <Card>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-col h-full">
              <div className="flex items-start">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="font-medium text-gray-900">{item.price}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-rose-500 mr-1">{getCategoryIcon(item.category)}</span>
                    <span className="text-xs text-gray-500">{getCategoryName(item.category)}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <Badge variant={item.available ? "success" : "danger"}>
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 flex-1">{item.description}</p>
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" icon={<FaEdit />}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" icon={<FaTrash />} className="text-red-500 hover:text-red-600">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card>
          <div className="py-12 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <FaUtensils size={32} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No menu items found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm
                ? `No results for "${searchTerm}"`
                : categoryFilter !== "all"
                  ? `No items in the ${getCategoryName(categoryFilter)} category`
                  : "Try adding some menu items to get started"}
            </p>
            <div className="mt-6">
              <Button icon={<FaPlus />}>Add New Item</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default MenuManagement
