'use server';

/**
 * @fileOverview An AI agent to optimize transport routes.
 *
 * - optimizeTransportRoutes - A function that handles the route optimization process.
 * - OptimizeTransportRoutesInput - The input type for the optimizeTransportRoutes function.
 * - OptimizeTransportRoutesOutput - The return type for the optimizeTransportRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeTransportRoutesInputSchema = z.object({
  origin: z.string().describe('The starting location for the transport route.'),
  destination: z.string().describe('The final destination for the transport route.'),
  waypoints: z.array(z.string()).optional().describe('An optional list of intermediate locations to pass through.'),
  trafficConditions: z.string().describe('Real-time traffic conditions along the route.'),
  weatherConditions: z.string().describe('Current weather conditions along the route.'),
  deliverySchedule: z.string().describe('The delivery schedule, including time windows.'),
});
export type OptimizeTransportRoutesInput = z.infer<typeof OptimizeTransportRoutesInputSchema>;

const OptimizeTransportRoutesOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized transport route with estimated travel time.'),
  estimatedTravelTime: z.string().describe('The estimated travel time for the optimized route.'),
  recommendations: z.string().describe('Recommendations for minimizing delays and improving efficiency based on traffic, weather, and schedule.'),
});
export type OptimizeTransportRoutesOutput = z.infer<typeof OptimizeTransportRoutesOutputSchema>;

export async function optimizeTransportRoutes(input: OptimizeTransportRoutesInput): Promise<OptimizeTransportRoutesOutput> {
  return optimizeTransportRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeTransportRoutesPrompt',
  input: {schema: OptimizeTransportRoutesInputSchema},
  output: {schema: OptimizeTransportRoutesOutputSchema},
  prompt: `You are an expert transport route optimizer. Your goal is to find the best route to minimize delays and improve efficiency, based on real-time traffic, weather conditions, and the delivery schedule.

  Origin: {{{origin}}}
  Destination: {{{destination}}}
  {{#if waypoints}}
  Waypoints: {{{waypoints}}}
  {{/if}}
  Traffic Conditions: {{{trafficConditions}}}
  Weather Conditions: {{{weatherConditions}}}
  Delivery Schedule: {{{deliverySchedule}}}

  Provide the optimized route, estimated travel time, and recommendations to minimize delays and improve efficiency.
  `,
});

const optimizeTransportRoutesFlow = ai.defineFlow(
  {
    name: 'optimizeTransportRoutesFlow',
    inputSchema: OptimizeTransportRoutesInputSchema,
    outputSchema: OptimizeTransportRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
