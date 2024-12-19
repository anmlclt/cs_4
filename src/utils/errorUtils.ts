import { PostgrestError } from '@supabase/supabase-js';

export const handleSupabaseError = (error: PostgrestError) => {
  console.error('Database error:', {
    message: error.message,
    details: error.details,
    hint: error.hint
  });
  
  // Return safe default values
  return { scores: [], totalCount: 0 };
};

export const isNetworkError = (error: any): boolean => {
  return error instanceof TypeError && error.message === 'Failed to fetch';
};