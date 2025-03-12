"use client"

import type React from "react"

import type { ChangeEvent, DragEvent } from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, ImageIcon, ArrowUp, ArrowDown } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface ImageUploaderProps {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export function ImageUploader({ images, setImages }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const { toast } = useToast()

  // Handle drag events
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  // Process the file upload
  const processFiles = (files: FileList | null) => {
    if (!files) return

    // Check file types and sizes
    const validFiles: File[] = []
    const invalidFiles: string[] = []

    Array.from(files).forEach((file) => {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        invalidFiles.push(`${file.name} is not an image file`)
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} exceeds the 5MB size limit`)
        return
      }

      validFiles.push(file)
    })

    // Show error for invalid files
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid files",
        description: invalidFiles.join(", "),
        variant: "destructive",
      })
    }

    // Process valid files
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          // In a real app, you would upload the file to a server
          // For this demo, we'll just use the data URL
          setImages((prev) => [...prev, e.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    processFiles(e.dataTransfer.files)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files)
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const moveImage = useCallback(
    (index: number, direction: "up" | "down") => {
      setImages((prevImages) => {
        const newImages = [...prevImages]
        if (direction === "up" && index > 0) {
          ;[newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]]
        } else if (direction === "down" && index < newImages.length - 1) {
          ;[newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
        }
        return newImages
      })
    },
    [setImages],
  )

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Drag and drop your images here</p>
            <p className="text-xs text-muted-foreground">Supports: JPG, PNG, GIF (Max size: 5MB)</p>
          </div>
          <div>
            <label htmlFor="file-upload">
              <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
                <span>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Browse Files
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <Card className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => moveImage(index, "up")}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => moveImage(index, "down")}
                        disabled={index === images.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-xs py-1 text-center">
                    Main Image
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

