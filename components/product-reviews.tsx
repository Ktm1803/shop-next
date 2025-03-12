"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown, Flag, AlertCircle, ShoppingBag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

// Mock data - in a real app, this would come from an API
const reviews = [
  {
    id: "1",
    productId: "1",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      hasPurchased: true,
    },
    rating: 5,
    title: "Excellent sound quality and noise cancellation",
    comment:
      "I've been using these headphones for a month now and I'm extremely impressed with the sound quality and noise cancellation. The battery life is also excellent, lasting me through an entire week of commuting.",
    date: "2025-02-15",
    helpful: 24,
    unhelpful: 2,
    verified: true,
  },
  {
    id: "2",
    productId: "1",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      hasPurchased: true,
    },
    rating: 4,
    title: "Great headphones, but a bit pricey",
    comment:
      "The sound quality and noise cancellation are top-notch, but I think they're a bit overpriced. The touch controls can also be a bit finicky at times. Overall, I'm happy with my purchase, but I think there's room for improvement.",
    date: "2025-02-10",
    helpful: 18,
    unhelpful: 3,
    verified: true,
  },
  {
    id: "3",
    productId: "1",
    user: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RJ",
      hasPurchased: true,
    },
    rating: 5,
    title: "Best headphones I've ever owned",
    comment:
      "These headphones are simply amazing. The noise cancellation is so good that I can't hear anything around me when I'm listening to music. The sound quality is also excellent, with deep bass and clear highs. Highly recommended!",
    date: "2025-02-05",
    helpful: 32,
    unhelpful: 1,
    verified: true,
  },
  {
    id: "4",
    productId: "2",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
      hasPurchased: true,
    },
    rating: 5,
    title: "Amazing camera and display",
    comment:
      "The camera on this phone is incredible. The 108MP main sensor captures so much detail, and the 100x zoom is surprisingly useful. The display is also gorgeous, with vibrant colors and smooth scrolling.",
    date: "2025-02-20",
    helpful: 15,
    unhelpful: 0,
    verified: true,
  },
]

export function ProductReviews({ productId }: { productId: string }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewComment, setReviewComment] = useState("")
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)
  const { toast } = useToast()
  const { user, checkPurchase } = useAuth()
  const router = useRouter()

  // Filter reviews for the current product
  const productReviews = reviews.filter((review) => review.productId === productId)

  // Check if the current user has purchased this product
  const hasPurchased = user ? checkPurchase(productId) : false

  // Check if user is logged in
  const isLoggedIn = !!user

  const handleReviewSubmit = () => {
    if (!rating) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      })
      return
    }

    if (!reviewTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for your review.",
        variant: "destructive",
      })
      return
    }

    if (!reviewComment.trim()) {
      toast({
        title: "Review required",
        description: "Please write your review before submitting.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would submit the review to an API
    toast({
      title: "Review submitted",
      description: "Thank you for your review! It will be published after moderation.",
    })

    // Reset form
    setRating(0)
    setReviewTitle("")
    setReviewComment("")
    setShowReviewForm(false)
  }

  const handleWriteReviewClick = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true)
    } else if (!hasPurchased) {
      setShowPurchaseDialog(true)
    } else {
      setShowReviewForm(true)
    }
  }

  const handleLoginRedirect = () => {
    router.push(`/login?redirectTo=/products/${productId}`)
  }

  if (productReviews.length === 0 && !showReviewForm) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">This product has no reviews yet. Be the first to leave a review!</p>
        <Button onClick={handleWriteReviewClick}>Write a Review</Button>

        {/* Login Dialog */}
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
              <DialogDescription>You need to be logged in to write a review.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleLoginRedirect}>Login</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Purchase Dialog */}
        <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase Required</DialogTitle>
              <DialogDescription>You can only review products that you have purchased.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center py-4">
              <div className="bg-muted/50 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-lg font-medium">{productReviews.length} Reviews</span>
          {productReviews.length > 0 && (
            <div className="flex items-center mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {(productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length).toFixed(1)}{" "}
                out of 5
              </span>
            </div>
          )}
        </div>
        {!showReviewForm && <Button onClick={handleWriteReviewClick}>Write a Review</Button>}

        {/* Login Dialog */}
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
              <DialogDescription>You need to be logged in to write a review.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleLoginRedirect}>Login</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Purchase Dialog */}
        <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase Required</DialogTitle>
              <DialogDescription>You can only review products that you have purchased.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center py-4">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-2" />
            </div>
            <p className="text-center mb-4">
              To ensure authentic reviews, only verified purchasers can write reviews for this product.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button asChild>
                <a href={`/products/${productId}`}>Buy This Product</a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {showReviewForm && hasPurchased && (
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <div className="mb-4">
            <Label className="block text-sm font-medium mb-2">Rating</Label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="review-title" className="block text-sm font-medium mb-2">
              Title
            </Label>
            <Input
              id="review-title"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              className="w-full"
              placeholder="Summarize your experience"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="review-comment" className="block text-sm font-medium mb-2">
              Review
            </Label>
            <Textarea
              id="review-comment"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={5}
              placeholder="Share your experience with this product"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowReviewForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleReviewSubmit}>Submit Review</Button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {productReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {review.date}
                    {review.verified && <span className="ml-2 text-green-600">Verified Purchase</span>}
                  </div>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <h4 className="font-medium mt-3">{review.title}</h4>
            <p className="mt-2 text-muted-foreground">{review.comment}</p>
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ThumbsDown className="h-4 w-4 mr-1" />
                <span>Not Helpful ({review.unhelpful})</span>
              </button>
              <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                <Flag className="h-4 w-4 mr-1" />
                <span>Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

