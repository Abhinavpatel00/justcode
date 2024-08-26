// lib/queries.ts
import { supabase } from './supabase'; // Adjust the path if necessary

export const fetchQuestions = async () => {
  const { data, error } = await supabase
    .from('questions')
    .select('*');

  if (error) {
    console.error('Error fetching questions:', error);
    return [];
  }

  return data || [];
};
