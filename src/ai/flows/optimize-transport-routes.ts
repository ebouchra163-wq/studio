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
  origin: z.string().describe('La ubicación de inicio de la ruta de transporte.'),
  destination: z.string().describe('El destino final de la ruta de transporte.'),
  waypoints: z.array(z.string()).optional().describe('Una lista opcional de ubicaciones intermedias por las que pasar.'),
  trafficConditions: z.string().describe('Condiciones del tráfico en tiempo real a lo largo de la ruta.'),
  weatherConditions: z.string().describe('Condiciones climáticas actuales a lo largo de la ruta.'),
  deliverySchedule: z.string().describe('El cronograma de entrega, incluidas las ventanas de tiempo.'),
});
export type OptimizeTransportRoutesInput = z.infer<typeof OptimizeTransportRoutesInputSchema>;

const OptimizeTransportRoutesOutputSchema = z.object({
  optimizedRoute: z.string().describe('La ruta de transporte optimizada con el tiempo de viaje estimado.'),
  estimatedTravelTime: z.string().describe('El tiempo de viaje estimado para la ruta optimizada.'),
  recommendations: z.string().describe('Recomendaciones para minimizar retrasos y mejorar la eficiencia basadas en el tráfico, el clima y el cronograma.'),
});
export type OptimizeTransportRoutesOutput = z.infer<typeof OptimizeTransportRoutesOutputSchema>;

export async function optimizeTransportRoutes(input: OptimizeTransportRoutesInput): Promise<OptimizeTransportRoutesOutput> {
  return optimizeTransportRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeTransportRoutesPrompt',
  input: {schema: OptimizeTransportRoutesInputSchema},
  output: {schema: OptimizeTransportRoutesOutputSchema},
  prompt: `Eres un experto optimizador de rutas de transporte. Tu objetivo es encontrar la mejor ruta para minimizar retrasos y mejorar la eficiencia, basándote en el tráfico en tiempo real, las condiciones climáticas y el cronograma de entrega.

  Origen: {{{origin}}}
  Destino: {{{destination}}}
  {{#if waypoints}}
  Puntos intermedios: {{{waypoints}}}
  {{/if}}
  Condiciones del tráfico: {{{trafficConditions}}}
  Condiciones climáticas: {{{weatherConditions}}}
  Cronograma de entrega: {{{deliverySchedule}}}

  Proporciona la ruta optimizada, el tiempo de viaje estimado y recomendaciones para minimizar retrasos y mejorar la eficiencia.
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
