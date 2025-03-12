"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Search, Trash2, Eye, Copy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data
const initialProducts = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    price: 349.99,
    category: "Electronics",
    stock: 15,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    isPublished: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 1199.99,
    category: "Electronics",
    stock: 8,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    isPublished: true,
  },
  {
    id: "3",
    name: "Apple MacBook Pro 16-inch",
    price: 2399.99,
    category: "Electronics",
    stock: 5,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    isPublished: true,
  },
  {
    id: "4",
    name: "Fitbit Versa 3 Health & Fitness Smartwatch",
    price: 199.99,
    category: "Electronics",
    stock: 12,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=1000&auto=format&fit=crop",
    isPublished: true,
  },
  {
    id: "5",
    name: "Anker Wireless Charging Pad",
    price: 29.99,
    category: "Electronics",
    stock: 20,
    image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?q=80&w=1000&auto=format&fit=crop",
    isPublished: true,
  },
  {
    id: "9",
    name: "Nike Air Zoom Pegasus 38 Running Shoes",
    price: 120.0,
    category: "Clothing",
    stock: 45,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    isPublished: true,
  },
  {
    id: "13",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 89.99,
    category: "Home & Kitchen",
    stock: 42,
    image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?q=80&w=1000&auto=format&fit=crop",
    isPublished: true,
  },
  {
    id: "17",
    name: "Neutrogena Hydro Boost Water Gel",
    price: 19.99,
    category: "Beauty & Personal Care",
    stock: 75,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop",
    isPublished: false,
  },
]

export function AdminProductList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState(initialProducts)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // Load products from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("adminProducts")
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts))
      } catch (error) {
        console.error("Error parsing stored products:", error)
      }
    }
  }, [])

  // Save products to localStorage when they change
  useEffect(() => {
    localStorage.setItem("adminProducts", JSON.stringify(products))
  }, [products])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      })
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const handleDuplicateProduct = (product: (typeof products)[0]) => {
    const newProduct = {
      ...product,
      id: `${product.id}-copy-${Date.now()}`,
      name: `${product.name} (Copy)`,
    }

    setProducts([...products, newProduct])

    toast({
      title: "Product duplicated",
      description: "A copy of the product has been created.",
    })
  }

  const togglePublishStatus = (id: string) => {
    setProducts(
      products.map((product) => (product.id === id ? { ...product, isPublished: !product.isPublished } : product)),
    )

    const product = products.find((p) => p.id === id)
    if (product) {
      toast({
        title: product.isPublished ? "Product unpublished" : "Product published",
        description: product.isPublished
          ? "The product has been unpublished and is no longer visible to customers."
          : "The product has been published and is now visible to customers.",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/products/new">Add New Product</Link>
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium max-w-[200px] truncate">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.stock <= 5 ? (
                      <Badge variant="destructive">{product.stock}</Badge>
                    ) : product.stock <= 20 ? (
                      <Badge variant="outline">{product.stock}</Badge>
                    ) : (
                      product.stock
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.isPublished ? "default" : "secondary"}>
                      {product.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/products/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/products/edit/${product.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateProduct(product)}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublishStatus(product.id)}>
                          {product.isPublished ? (
                            <>
                              <Eye className="mr-2 h-4 w-4 opacity-50" />
                              <span>Unpublish</span>
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Publish</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

