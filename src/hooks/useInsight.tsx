import { useCallback, useEffect, useRef, useState } from 'react';

import { buildAIPrompt } from '@/data/aiPrompt';
import type { SimulationRecord } from '@/data/simulation';
import { useSimulationStorage } from '@/hooks/useSimulationsStorage';
import { getInsight, type InsightData } from '@/service/aiService';
export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);
  const { getFormData, updateSimulation } = useSimulationStorage();

  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id);

    if (simulation?.insight) {
      return simulation.insight;
    }

    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError('Simulação não encontrada.');
        return;
      }

      if (isRequestPending.current || simulation.insight) {
        return;
      }

      isRequestPending.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);
        const data = await getInsight(prompt);

        setInsight(data);

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord);
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.');
      } finally {
        isRequestPending.current = false;
        setIsLoading(false);
      }
    },
    [getFormData, updateSimulation],
  );

  useEffect(() => {
    if (!id || insight || isLoading || error || isRequestPending.current) {
      return;
    }

    void fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
