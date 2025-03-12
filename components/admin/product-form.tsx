"use client"

import type React from "react"

import type { ChangeEvent } from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUploader } from "@/components/admin/image-uploader"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"

// Categories and brands for select options
const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "home", name: "Home & Kitchen" },
  { id: "beauty", name: "Beauty & Personal Care" },
]

const brands = [
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "sony", name: "Sony" },
  { id: "lg", name: "LG" },
  { id: "nike", name: "Nike" },
  { id: "adidas", name: "Adidas" },
  { id: "levi", name: "Levi's" },
  { id: "patagonia", name: "Patagonia" },
  { id: "dyson", name: "Dyson" },
  { id: "kitchenaid", name: "KitchenAid" },
  { id: "instant-pot", name: "Instant Pot" },
  { id: "philips", name: "Philips" },
  { id: "neutrogena", name: "Neutrogena" },
  { id: "cerave", name: "Cerave" },
  { id: "olaplex", name: "Olaplex" },
  { id: "bose", name: "Bose" },
  { id: "gopro", name: "GoPro" },
  { id: "fitbit", name: "Fitbit" },
  { id: "anker", name: "Anker" },
  { id: "jbl", name: "JBL" },
  { id: "logitech", name: "Logitech" },
]

export function ProductForm({ existingProduct = null }: { existingProduct?: any }) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>(existingProduct?.images || [])
  const [features, setFeatures] = useState<string[]>(existingProduct?.features || [""])
  const [tags, setTags] = useState<string[]>(existingProduct?.tags || [""])
  const [specifications, setSpecifications] = useState<Array<{ key: string; value: string }>>(
    existingProduct?.specifications
      ? Object.entries(existingProduct.specifications).map(([key, value]) => ({ key, value: value as string }))
      : [{ key: "Brand", value: "" }],
  )

  // Product form state
  const [product, setProduct] = useState({
    name: existingProduct?.name || "",
    price: existingProduct?.price?.toString() || "",
    discount: existingProduct?.discount?.toString() || "",
    description: existingProduct?.description || "",
    richDescription: existingProduct?.richDescription || "",
    brand: existingProduct?.brand || "",
    category: existingProduct?.category || "",
    stock: existingProduct?.stock?.toString() || "",
    sku: existingProduct?.sku || "",
    isPublished: existingProduct?.isPublished !== false,
  })

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setProduct((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle rich text editor changes
  const handleRichTextChange = (value: string) => {
    setProduct((prev) => ({ ...prev, richDescription: value }))
  }

  // Handle feature changes
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  // Add new feature field
  const addFeature = () => {
    setFeatures([...features, ""])
  }

  // Remove feature field
  const removeFeature = (index: number) => {
    const newFeatures = [...features]
    newFeatures.splice(index, 1)
    setFeatures(newFeatures)
  }

  // Handle tag changes
  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  // Add new tag field
  const addTag = () => {
    setTags([...tags, ""])
  }

  // Remove tag field
  const removeTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
  }

  // Handle specification changes
  const handleSpecificationChange = (index: number, field: "key" | "value", value: string) => {
    const newSpecifications = [...specifications]
    newSpecifications[index][field] = value
    setSpecifications(newSpecifications)
  }

  // Add new specification field
  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }])
  }

  // Remove specification field
  const removeSpecification = (index: number) => {
    const newSpecifications = [...specifications]
    newSpecifications.splice(index, 1)
    setSpecifications(newSpecifications)
  }

  // Generate a random SKU if not provided
  const generateSKU = () => {
    if (product.sku) return

    const brandPrefix = product.brand ? product.brand.substring(0, 3).toUpperCase() : "PRD"
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    const sku = `${brandPrefix}-${randomNum}`

    setProduct((prev) => ({ ...prev, sku }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!product.name || !product.price || !product.category || !product.brand) {
        throw new Error("Please fill in all required fields")
      }

      if (images.length === 0) {
        throw new Error("Please upload at least one product image")
      }

      // Generate SKU if not provided
      if (!product.sku) {
        generateSKU()
      }

      // Filter out empty features, tags, and specifications
      const filteredFeatures = features.filter((feature) => feature.trim() !== "")
      const filteredTags = tags.filter((tag) => tag.trim() !== "")
      const filteredSpecifications = specifications.filter((spec) => spec.key.trim() !== "" && spec.value.trim() !== "")

      // Create product object
      const newProduct = {
        ...product,
        price: Number.parseFloat(product.price),
        discount: product.discount ? Number.parseFloat(product.discount) : 0,
        stock: Number.parseInt(product.stock, 10),
        images,
        features: filteredFeatures,
        tags: filteredTags,
        specifications: Object.fromEntries(filteredSpecifications.map((spec) => [spec.key, spec.value])),
      }

      // In a real app, you would send this data to your API
      console.log("New product:", newProduct)

      // Show success message
      toast({
        title: existingProduct ? "Product updated" : "Product created",
        description: existingProduct
          ? "The product has been updated successfully."
          : "The product has been created successfully.",
      })

      // Redirect to products page
      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while saving the product",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <div className="flex gap-2">
                <Input
                  id="sku"
                  name="sku"
                  value={product.sku}
                  onChange={handleChange}
                  placeholder="Enter product SKU"
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={generateSKU}>
                  Generate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">
                Price <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter product price"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                min="0"
                max="100"
                value={product.discount}
                onChange={handleChange}
                placeholder="Enter discount percentage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={product.category}
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">
                Brand <span className="text-destructive">*</span>
              </Label>
              <Select value={product.brand} onValueChange={(value) => handleSelectChange("brand", value)} required>
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">
                Stock Quantity <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={product.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                required
              />
            </div>

            <div className="space-y-2 flex items-center">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="isPublished">Published Status</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublished"
                    checked={product.isPublished}
                    onCheckedChange={(checked) => handleSwitchChange("isPublished", checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {product.isPublished ? "Product is published" : "Product is draft"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter a brief product description"
              rows={3}
            />
          </div>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="py-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label>
                  Product Images <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload images for your product. The first image will be used as the main product image.
                </p>
                <ImageUploader images={images} setImages={setImages} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Description Tab */}
        <TabsContent value="description" className="py-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="richDescription">Detailed Description</Label>
                  <RichTextEditor value={product.richDescription} onChange={handleRichTextChange} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attributes Tab */}
        <TabsContent value="attributes" className="py-4">
          <div className="space-y-6">
            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Product Features</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                      <Plus className="h-4 w-4 mr-2" /> Add Feature
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          placeholder="Enter product feature"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFeature(index)}
                          disabled={features.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Product Specifications</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                      <Plus className="h-4 w-4 mr-2" /> Add Specification
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={spec.key}
                          onChange={(e) => handleSpecificationChange(index, "key", e.target.value)}
                          placeholder="Specification name"
                          className="w-1/3"
                        />
                        <Input
                          value={spec.value}
                          onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                          placeholder="Specification value"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSpecification(index)}
                          disabled={specifications.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Product Tags</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addTag}>
                      <Plus className="h-4 w-4 mr-2" /> Add Tag
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {tags.map((tag, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={tag}
                          onChange={(e) => handleTagChange(index, e.target.value)}
                          placeholder="Enter product tag"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTag(index)}
                          disabled={tags.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {existingProduct ? "Updating..." : "Creating..."}
            </>
          ) : existingProduct ? (
            "Update Product"
          ) : (
            "Create Product"
          )}
        </Button>
      </div>
    </form>
  )
}

