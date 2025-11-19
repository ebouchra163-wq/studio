"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Route } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  OptimizeTransportRoutesInput,
  OptimizeTransportRoutesOutput,
  optimizeTransportRoutes,
} from "@/ai/flows/optimize-transport-routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  origin: z.string().min(1, "Origin is required."),
  destination: z.string().min(1, "Destination is required."),
  waypoints: z.string().optional(),
  trafficConditions: z.enum(["Light", "Moderate", "Heavy"]),
  weatherConditions: z.string().min(1, "Weather conditions are required."),
  deliverySchedule: z.string().min(1, "Delivery schedule is required."),
});

export default function OptimizePage() {
  const { toast } = useToast();
  const [result, setResult] = useState<OptimizeTransportRoutesOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "",
      destination: "",
      waypoints: "",
      trafficConditions: "Moderate",
      weatherConditions: "",
      deliverySchedule: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    const input: OptimizeTransportRoutesInput = {
      ...values,
      waypoints: values.waypoints
        ? values.waypoints.split("\n").filter((w) => w.trim() !== "")
        : [],
    };

    try {
      const optimizationResult = await optimizeTransportRoutes(input);
      setResult(optimizationResult);
    } catch (error) {
      console.error("Optimization failed:", error);
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: "An error occurred while optimizing the route. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Logistics Route Optimization
        </h1>
        <p className="text-muted-foreground">
          Use our AI tool to find the most efficient route for your shipments.
        </p>
      </div>
      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle>Route Parameters</CardTitle>
          <CardDescription>
            Fill in the details below to generate an optimized route.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., New York, NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Los Angeles, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="waypoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waypoints (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Chicago, IL (one per line)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter any intermediate stops, one per line.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="trafficConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Traffic Conditions</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select traffic conditions" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Light">Light</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Heavy">Heavy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weatherConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weather Conditions</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Clear skies, 75°F" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="deliverySchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Schedule</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Deliver by July 30, 5:00 PM"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Route className="mr-2 h-4 w-4" /> Optimize Route
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Optimization Result</CardTitle>
            <CardDescription>
              Here is the AI-powered route recommendation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold">Optimized Route</h3>
              <p className="text-muted-foreground">{result.optimizedRoute}</p>
            </div>
            <div>
              <h3 className="font-semibold">Estimated Travel Time</h3>
              <p className="text-muted-foreground">
                {result.estimatedTravelTime}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Recommendations</h3>
              <p className="text-muted-foreground">{result.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
