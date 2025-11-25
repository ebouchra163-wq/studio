'use server';

/**
 * @fileOverview Resume las consultas de los clientes usando GenAI.
 *
 * - summarizeCustomerInquiry - Una función para resumir las consultas de los clientes.
 * - SummarizeCustomerInquiryInput - El tipo de entrada para la función summarizeCustomerInquiry.
 * - SummarizeCustomerInquiryOutput - El tipo de retorno para la función summarizeCustomerInquiry.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCustomerInquiryInputSchema = z.object({
  inquiry: z.string().describe('El texto de la consulta del cliente a resumir.'),
});

export type SummarizeCustomerInquiryInput = z.infer<typeof SummarizeCustomerInquiryInputSchema>;

const SummarizeCustomerInquiryOutputSchema = z.object({
  summary: z.string().describe('Un resumen conciso de la consulta del cliente.'),
});

export type SummarizeCustomerInquiryOutput = z.infer<typeof SummarizeCustomerInquiryOutputSchema>;

export async function summarizeCustomerInquiry(input: SummarizeCustomerInquiryInput): Promise<SummarizeCustomerInquiryOutput> {
  return summarizeCustomerInquiryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCustomerInquiryPrompt',
  input: {schema: SummarizeCustomerInquiryInputSchema},
  output: {schema: SummarizeCustomerInquiryOutputSchema},
  prompt: `Resume la siguiente consulta de cliente de forma concisa:\n\n{{{inquiry}}}`,
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
