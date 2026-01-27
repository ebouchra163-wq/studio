'use server';

/**
 * @fileOverview Un agent d'IA per optimitzar rutes de transport.
 *
 * - optimizeTransportRoutes - Una funció que gestiona el procés d'optimització de rutes.
 * - OptimizeTransportRoutesInput - El tipus d'entrada per a la funció optimizeTransportRoutes.
 * - OptimizeTransportRoutesOutput - El tipus de retorn per a la funció optimizeTransportRoutes.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeTransportRoutesInputSchema = z.object({
  origin: z.string().describe("La ubicació d'inici de la ruta de transport."),
  destination: z.string().describe("El destí final de la ruta de transport."),
  waypoints: z.array(z.string()).optional().describe("Una llista opcional d'ubicacions intermèdies per on passar."),
  trafficConditions: z.string().describe("Condicions del trànsit en temps real al llarg de la ruta."),
  weatherConditions: z.string().describe("Condicions climàtiques actuals al llarg de la ruta."),
  deliverySchedule: z.string().describe("L'horari d'entrega, incloent finestres de temps."),
});
export type OptimizeTransportRoutesInput = z.infer<typeof OptimizeTransportRoutesInputSchema>;

const OptimizeTransportRoutesOutputSchema = z.object({
  optimizedRoute: z.string().describe("La ruta de transport optimitzada amb el temps de viatge estimat."),
  estimatedTravelTime: z.string().describe("El temps de viatge estimat per a la ruta optimitzada."),
  recommendations: z.string().describe("Recomanacions per minimitzar retards i millorar l'eficiència basades en el trànsit, el clima i l'horari."),
});
export type OptimizeTransportRoutesOutput = z.infer<typeof OptimizeTransportRoutesOutputSchema>;

export async function optimizeTransportRoutes(input: OptimizeTransportRoutesInput): Promise<OptimizeTransportRoutesOutput> {
  return optimizeTransportRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeTransportRoutesPrompt',
  input: {schema: OptimizeTransportRoutesInputSchema},
  output: {schema: OptimizeTransportRoutesOutputSchema},
  prompt: `Ets un expert optimitzador de rutes de transport. El teu objectiu és trobar la millor ruta per minimitzar retards i millorar l'eficiència, basant-te en el trànsit en temps real, les condicions climàtiques i l'horari d'entrega.

  Origen: {{{origin}}}
  Destí: {{{destination}}}
  {{#if waypoints}}
  Punts intermedis: {{{waypoints}}}
  {{/if}}
  Condicions del Trànsit: {{{trafficConditions}}}
  Condicions Climàtiques: {{{weatherConditions}}}
  Horari d'Entrega: {{{deliverySchedule}}}

  Proporciona la ruta optimitzada, el temps estimat de viatge i recomanacions per minimitzar retards i millorar l'eficiència.
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
