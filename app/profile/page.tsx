"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, User, MapPin, Lock, CreditCard, Package, Heart } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Personal information form state
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Address form state
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  // Password form state
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      })

      if (user.address) {
        setAddress({
          street: user.address.street || "",
          city: user.address.city || "",
          state: user.address.state || "",
          zipCode: user.address.zipCode || "",
          country: user.address.country || "",
        })
      }
    }
  }, [user])

  // Handle personal information form submission
  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!personalInfo.name) {
        throw new Error("Name is required")
      }

      // Update user profile
      await updateUserProfile({
        ...user,
        name: personalInfo.name,
        phone: personalInfo.phone,
      })

      toast({
        title: "Profile updated",
        description: "Your personal information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "An error occurred while updating your profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle address form submission
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
        throw new Error("All address fields are required")
      }

      // Update user profile
      await updateUserProfile({
        ...user,
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
        },
      })

      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "An error occurred while updating your address",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle password form submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!passwordInfo.currentPassword || !passwordInfo.newPassword || !passwordInfo.confirmPassword) {
        throw new Error("All password fields are required")
      }

      if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
        throw new Error("New passwords do not match")
      }

      if (passwordInfo.newPassword.length < 8) {
        throw new Error("New password must be at least 8 characters long")
      }

      // In a real app, you would verify the current password and update the password
      // For this demo, we'll just show a success message

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })

      // Reset password form
      setPasswordInfo({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "An error occurred while updating your password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <p className="mb-6">Please log in to view your profile.</p>
        <Button asChild>
          <Link href="/login?redirectTo=/profile">Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.id}`} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Link href="/profile" className="flex items-center space-x-2 p-2 rounded-md bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Link>
                <Link href="/orders" className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                  <Package className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
                <Link href="/wishlist" className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
                <Link href="/payment-methods" className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                  <CreditCard className="h-4 w-4" />
                  <span>Payment Methods</span>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">
                <User className="h-4 w-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="address">
                <MapPin className="h-4 w-4 mr-2" />
                Address
              </TabsTrigger>
              <TabsTrigger value="password">
                <Lock className="h-4 w-4 mr-2" />
                Password
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal information and contact details.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePersonalInfoSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        placeholder="John Doe"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        placeholder="john@example.com"
                        disabled={true} // Email cannot be changed
                      />
                      <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        disabled={isLoading}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Update your shipping and billing address.</CardDescription>
                </CardHeader>
                <form onSubmit={handleAddressSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        placeholder="123 Main St"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          placeholder="New York"
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          placeholder="NY"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={address.zipCode}
                          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                          placeholder="10001"
                          disabled={isLoading}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={address.country}
                          onChange={(e) => setAddress({ ...address, country: e.target.value })}
                          placeholder="United States"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Address"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Password Tab */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordInfo.currentPassword}
                        onChange={(e) => setPasswordInfo({ ...passwordInfo, currentPassword: e.target.value })}
                        placeholder="••••••••"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordInfo.newPassword}
                        onChange={(e) => setPasswordInfo({ ...passwordInfo, newPassword: e.target.value })}
                        placeholder="••••••••"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordInfo.confirmPassword}
                        onChange={(e) => setPasswordInfo({ ...passwordInfo, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

