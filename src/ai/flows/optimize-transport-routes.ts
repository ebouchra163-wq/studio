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
  origin: z.string().describe('La ubicació d\'inici de la ruta de transport.'),
  destination: z.string().describe('La destinació final de la ruta de transport.'),
  waypoints: z.array(z.string()).optional().describe('Una llista opcional d\'ubicacions intermèdies per les quals passar.'),
  trafficConditions: z.string().describe('Condicions del trànsit en temps real al llarg de la ruta.'),
  weatherConditions: z.string().describe('Condicions climàtiques actuals al llarg de la ruta.'),
  deliverySchedule: z.string().describe('El cronograma d\'entrega, incloses les finestres de temps.'),
});
export type OptimizeTransportRoutesInput = z.infer<typeof OptimizeTransportRoutesInputSchema>;

const OptimizeTransportRoutesOutputSchema = z.object({
  optimizedRoute: z.string().describe('La ruta de transport optimitzada amb el temps de viatge estimat.'),
  estimatedTravelTime: z.string().describe('El temps de viatge estimat per a la ruta optimitzada.'),
  recommendations: z.string().describe('Recomanacions per minimitzar retards i millorar l\'eficiència basades en el trànsit, el clima i el cronograma.'),
});
export type OptimizeTransportRoutesOutput = z.infer<typeof OptimizeTransportRoutesOutputSchema>;

export async function optimizeTransportRoutes(input: OptimizeTransportRoutesInput): Promise<OptimizeTransportRoutesOutput> {
  return optimizeTransportRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeTransportRoutesPrompt',
  input: {schema: OptimizeTransportRoutesInputSchema},
  output: {schema: OptimizeTransportRoutesOutputSchema},
  prompt: `Ets un expert optimitzador de rutes de transport. El teu objectiu és trobar la millor ruta per minimitzar retards i millorar l'eficiència, basant-te en el trànsit en temps real, les condicions climàtiques i el cronograma d'entrega.

  Origen: {{{origin}}}
  Destinació: {{{destination}}}
  {{#if waypoints}}
  Punts intermedis: {{{waypoints}}}
  {{/if}}
  Condicions del trànsit: {{{trafficConditions}}}
  Condicions climàtiques: {{{weatherConditions}}}
  Cronograma d'entrega: {{{deliverySchedule}}}

  Proporciona la ruta optimitzada, el temps de viatge estimat i recomanacions per minimitzar retards i millorar l'eficiència.
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
