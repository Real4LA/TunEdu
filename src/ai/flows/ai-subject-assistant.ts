'use server';

/**
 * @fileOverview An AI assistant that provides canned responses to subject-related questions.
 *
 * - aiSubjectAssistant - A function that handles the AI assistant process.
 * - AISubjectAssistantInput - The input type for the aiSubjectAssistant function.
 * - AISubjectAssistantOutput - The return type for the aiSubjectAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISubjectAssistantInputSchema = z.object({
  subjectSlug: z.string().describe('The slug of the subject the question is about.'),
  question: z.string().describe('The question asked by the student.'),
});
export type AISubjectAssistantInput = z.infer<typeof AISubjectAssistantInputSchema>;

const AISubjectAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer from the AI assistant.'),
  citations: z.array(z.string()).describe('An array of citations if any were used to construct the answer.'),
});
export type AISubjectAssistantOutput = z.infer<typeof AISubjectAssistantOutputSchema>;

export async function aiSubjectAssistant(input: AISubjectAssistantInput): Promise<AISubjectAssistantOutput> {
  return aiSubjectAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSubjectAssistantPrompt',
  input: {schema: AISubjectAssistantInputSchema},
  output: {schema: AISubjectAssistantOutputSchema},
  prompt: `You are a helpful AI assistant for the TunEdu application, specializing in providing information related to the subject specified by subjectSlug.

  Your response should be in French.

  You should answer the user's question based on the subject. Provide a helpful and concise answer.

  Subject Slug: {{{subjectSlug}}}
  Question: {{{question}}}
  `,
});

const aiSubjectAssistantFlow = ai.defineFlow(
  {
    name: 'aiSubjectAssistantFlow',
    inputSchema: AISubjectAssistantInputSchema,
    outputSchema: AISubjectAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
