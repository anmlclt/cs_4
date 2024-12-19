import { useState, useEffect, useCallback } from 'react';
import { GameScore } from '../types/game';
import { leaderboardService } from '../services/leaderboardService';
import { isNetworkError } from '../utils/errorUtils';

export const useLeaderboard = () => {
  const [scores, setScores] = useState<GameScore[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = useCallback(async (page: number = currentPage) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { scores: fetchedScores, totalCount } = await leaderboardService.getScores(page);
      setScores(fetchedScores);
      setTotalPages(Math.ceil(totalCount / 10));
      setCurrentPage(page);
    } catch (error) {
      const errorMessage = isNetworkError(error)
        ? "Unable to connect to the server. Please check your internet connection."
        : "An error occurred while fetching scores. Please try again later.";
      
      setError(errorMessage);
      setScores([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const saveScore = async (score: Omit<GameScore, 'date'>) => {
    try {
      const success = await leaderboardService.saveScore(score);
      if (success) {
        await fetchScores(1); // Refresh scores and go to first page
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving score:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return {
    scores,
    isLoading,
    error,
    currentPage,
    totalPages,
    saveScore,
    refreshScores: fetchScores,
    goToPage: (page: number) => fetchScores(page)
  };
};