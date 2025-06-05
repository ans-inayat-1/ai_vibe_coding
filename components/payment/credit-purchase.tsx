"use client"

import { useState } from "react"
import { Check, CreditCard, Loader2, Shield } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const creditPackages = [
  { id: "basic", name: "Basic", credits: 50, price: 9.99, popular: false },
  { id: "standard", name: "Standard", credits: 150, price: 24.99, popular: true },
  { id: "premium", name: "Premium", credits: 500, price: 69.99, popular: false },
]

const paymentSchema = z.object({
  package: z.string(),
  cardName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

export function CreditPurchase() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      package: "standard",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  })

  const selectedPackage = creditPackages.find((pkg) => pkg.id === form.watch("package")) || creditPackages[1]

  async function onSubmit(data: PaymentFormValues) {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would call your payment processing API here
    console.log("Payment data:", data)

    setIsLoading(false)
    setIsSuccess(true)
  }

  return (
    <div className="w-full max-w-4xl">
      {isSuccess ? (
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription className="text-lg">
                You have successfully purchased {selectedPackage.credits} credits for ${selectedPackage.price}
              </CardDescription>
              <Button className="mt-4" onClick={() => (window.location.href = "/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Purchase Credits</CardTitle>
                <CardDescription>Select a credit package and enter your payment details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="package"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Select Credit Package</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              {creditPackages.map((pkg) => (
                                <div key={pkg.id} className="relative">
                                  <RadioGroupItem value={pkg.id} id={pkg.id} className="peer sr-only" />
                                  <label
                                    htmlFor={pkg.id}
                                    className="flex flex-col p-4 border rounded-lg cursor-pointer hover:border-blue-500 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-blue-500 relative"
                                  >
                                    {pkg.popular && (
                                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                                        Most Popular
                                      </div>
                                    )}
                                    <div className="font-semibold text-lg">{pkg.name}</div>
                                    <div className="text-2xl font-bold mt-2">${pkg.price}</div>
                                    <div className="text-muted-foreground mt-1">{pkg.credits} credits</div>
                                    <div className="text-sm text-muted-foreground mt-2">
                                      ${(pkg.price / pkg.credits).toFixed(2)} per credit
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Payment Details</h3>
                      </div>

                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1234 5678 9012 3456"
                                {...field}
                                onChange={(e) => {
                                  // Only allow digits and format with spaces
                                  const value = e.target.value.replace(/\D/g, "").substring(0, 16)
                                  field.onChange(value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="MM/YY"
                                  {...field}
                                  onChange={(e) => {
                                    // Format as MM/YY
                                    let value = e.target.value.replace(/\D/g, "")
                                    if (value.length > 2) {
                                      value = value.substring(0, 2) + "/" + value.substring(2, 4)
                                    }
                                    field.onChange(value)
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123"
                                  {...field}
                                  onChange={(e) => {
                                    // Only allow digits
                                    const value = e.target.value.replace(/\D/g, "").substring(0, 4)
                                    field.onChange(value)
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
                      <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertTitle className="text-blue-800 dark:text-blue-300">Secure Payment</AlertTitle>
                      <AlertDescription className="text-blue-700 dark:text-blue-400">
                        Your payment information is encrypted and secure. We never store your full card details.
                      </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing payment...
                        </>
                      ) : (
                        `Pay $${selectedPackage.price}`
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-medium">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credits</span>
                  <span className="font-medium">{selectedPackage.credits}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">${selectedPackage.price}</span>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    Instant delivery
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    No subscription, one-time payment
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    30-day money-back guarantee
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
