// app/results/page.tsx
import { supabase } from '@/lib/supabase';

const fetchResults = async () => {
  const { data, error } = await supabase
    .from('questions')
    .select('*');

  if (error) {
    console.error('Error fetching results:', error);
    return [];
  }

  return data || [];
};

const ResultsPage = async () => {
  const results = await fetchResults();

  return (
    <div>
      <h1>Quiz Results</h1>
      {results.map((result) => (
        <div key={result.question_id}>
          <h2>{result.question_text}</h2>
          <p>Option 1: {result.option_1}</p>
          <p>Option 2: {result.option_2}</p>
          <p>Option 3: {result.option_3}</p>
          <p>Option 4: {result.option_4}</p>
          <p>Correct Answer: {result.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsPage;
