'use server';

/**
 * @fileOverview Resumeix les consultes dels clients fent servir GenAI.
 *
 * - summarizeCustomerInquiry - Una funció per resumir les consultes dels clients.
 * - SummarizeCustomerInquiryInput - El tipus d'entrada per a la funció summarizeCustomerInquiry.
 * - SummarizeCustomerInquiryOutput - El tipus de retorn per a la funció summarizeCustomerInquiry.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCustomerInquiryInputSchema = z.object({
  inquiry: z.string().describe('El text de la consulta del client a resumir.'),
});

export type SummarizeCustomerInquiryInput = z.infer<typeof SummarizeCustomerInquiryInputSchema>;

const SummarizeCustomerInquiryOutputSchema = z.object({
  summary: z.string().describe('Un resum concís de la consulta del client.'),
});

export type SummarizeCustomerInquiryOutput = z.infer<typeof SummarizeCustomerInquiryOutputSchema>;

export async function summarizeCustomerInquiry(input: SummarizeCustomerInquiryInput): Promise<SummarizeCustomerInquiryOutput> {
  return summarizeCustomerInquiryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCustomerInquiryPrompt',
  input: {schema: SummarizeCustomerInquiryInputSchema},
  output: {schema: SummarizeCustomerInquiryOutputSchema},
  prompt: `Resumeix la següent consulta de client de forma concisa:\n\n{{{inquiry}}}`,
});

const summarizeCustomerInquiryFlow = ai.defineFlow(
  {
    name: 'summarizeCustomerInquiryFlow',
    inputSchema: SummarizeCustomerInquiryInputSchema,
    outputSchema: SummarizeCustomerInquiryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
