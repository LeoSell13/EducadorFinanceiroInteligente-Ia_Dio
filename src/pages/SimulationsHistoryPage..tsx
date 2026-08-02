import { CalendarClock, Eye, Goal, PiggyBank, Trash2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/shared/Button';
import { PageHero } from '@/components/shared/PageHero';
import { useSimulationStorage } from '@/hooks/useSimulationsStorage';

export function SimulationsHistoryPage() {
  const navigate = useNavigate();
  const { getAllFormData, deleteSimulation } = useSimulationStorage();
  const simulations = getAllFormData();

  const handleDeleteSimulation = (id: string) => {
    deleteSimulation(id);
    window.location.reload();
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="mb-6">
        <PageHero
          title="Histórico de simulações"
          subtitle="Acompanhe suas metas salvas, abra qualquer resultado ou remova uma meta quando quiser."
        />
      </div>

      {simulations.length === 0 ? (
        <div className="bg-card rounded-2xl p-8 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <p className="text-foreground mb-3 text-lg font-semibold">
            Nenhuma simulação salva ainda.
          </p>
          <p className="text-muted-foreground mb-6">
            Crie sua primeira simulação para guardar o plano e visualizar o resultado depois.
          </p>
          <Button variant="primary" icon={TrendingUp} onClick={() => void navigate('/')}>
            Criar primeira simulação
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {simulations.map((simulation) => (
            <article
              key={simulation.id}
              className="bg-card rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:w-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-primary mb-2 text-xs font-semibold tracking-widest uppercase">
                    Meta
                  </p>
                  <h2 className="text-foreground text-xl font-semibold">
                    {simulation.goalName || 'Meta sem nome'}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    icon={Eye}
                    onClick={() => void navigate(`/resultado/${simulation.id}`)}
                  >
                    Ver detalhes
                  </Button>
                  <Button
                    variant="ghost"
                    icon={Trash2}
                    onClick={() => handleDeleteSimulation(simulation.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-(--border) p-3">
                  <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                    <Goal size={16} />
                    Custo da meta
                  </div>
                  <p className="text-foreground font-semibold">{simulation.goalAmount}</p>
                </div>
                <div className="rounded-xl border border-(--border) p-3">
                  <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                    <PiggyBank size={16} />
                    Economia mensal
                  </div>
                  <p className="text-foreground font-semibold">
                    R${' '}
                    {Number(simulation.income) -
                      Number(simulation.expenses) -
                      Number(simulation.debts)}
                  </p>
                </div>
                <div className="rounded-xl border border-(--border) p-3">
                  <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                    <CalendarClock size={16} />
                    Prazo
                  </div>
                  <p className="text-foreground font-semibold">{simulation.goalDeadline} meses</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
