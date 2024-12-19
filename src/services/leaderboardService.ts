import { supabase } from '../lib/supabase';
import type { GameScore } from '../types/game';
import { handleSupabaseError } from '../utils/errorUtils';

const ITEMS_PER_PAGE = 10;

export const leaderboardService = {
  async getScores(page: number = 1): Promise<{
    scores: GameScore[];
    totalCount: number;
  }> {
    try {
      // Get total count with error handling
      const { count: totalCount, error: countError } = await supabase
        .from('leaderboard')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        return handleSupabaseError(countError);
      }

      // Get paginated scores with error handling
      const { data, error: scoresError } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

      if (scoresError) {
        return handleSupabaseError(scoresError);
      }

      return {
        scores: (data || []).map(score => ({
          name: score.name,
          score: score.score,
          level: score.level,
          time: score.time,
          date: score.created_at
        })),
        totalCount: totalCount || 0
      };
    } catch (error) {
      console.error('Error fetching scores:', error);
      return { scores: [], totalCount: 0 };
    }
  },

  async saveScore(score: Omit<GameScore, 'date'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('leaderboard')
        .insert([{
          name: score.name,
          score: score.score,
          level: score.level,
          time: score.time
        }]);

      if (error) {
        handleSupabaseError(error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error saving score:', error);
      return false;
    }
  }
};