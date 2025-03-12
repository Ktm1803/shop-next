import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/products">Browse Products</Link>
      </Button>
    </div>
  )
}

