import { SendHorizonal, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { useSimulationStorage } from '@/hooks/useSimulationsStorage';
import type { ChatMessage } from '@/service/aiService';
import { getEducatorResponse } from '@/service/aiService';

interface ChatPanelProps {
  simulationId: string;
}

export function ChatPanel({ simulationId }: ChatPanelProps) {
  const { getFormData, updateSimulation } = useSimulationStorage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const simulation = getFormData(simulationId);
    setMessages(simulation?.chatHistory ?? []);
  }, [simulationId]);

  const handleClearChat = () => {
    const simulation = getFormData(simulationId);

    if (simulation) {
      updateSimulation(simulationId, {
        ...simulation,
        chatHistory: [],
      });
    }

    setMessages([]);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const question = inputValue.trim();
    if (!question || isLoading) {
      return;
    }

    const simulation = getFormData(simulationId);
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: question }];

    setMessages(nextMessages);
    setInputValue('');
    setError(null);
    setIsLoading(true);

    if (simulation) {
      updateSimulation(simulationId, {
        ...simulation,
        chatHistory: nextMessages,
      });
    }

    try {
      const context = [
        `Renda mensal: ${simulation?.income ?? 'não informada'}`,
        `Custos fixos: ${simulation?.expenses ?? 'não informados'}`,
        `Dívidas: ${simulation?.debts ?? 'não informadas'}`,
        `Meta: ${simulation?.goalName ?? 'não informada'}`,
        `Custo da meta: ${simulation?.goalAmount ?? 'não informado'}`,
        `Prazo: ${simulation?.goalDeadline ?? 'não informado'} meses`,
      ].join(' | ');

      const response = await getEducatorResponse(question, nextMessages, context);
      const finalMessages: ChatMessage[] = [
        ...nextMessages,
        { role: 'assistant', content: response },
      ];

      setMessages(finalMessages);

      if (simulation) {
        updateSimulation(simulationId, {
          ...simulation,
          chatHistory: finalMessages,
        });
      }
    } catch {
      setError('Não foi possível responder agora. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-card rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl">
            <Sparkles size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-foreground text-lg font-semibold">
              Conversar com o Educador Financeiro
            </h2>
            <p className="text-muted-foreground text-sm">
              Tire dúvidas, peça orientações e guarde o histórico da conversa.
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" icon={Trash2} onClick={handleClearChat}>
            Limpar chat
          </Button>
        )}
      </div>

      <div className="mb-3 flex min-h-48 max-h-72 flex-col gap-2 overflow-y-auto rounded-2xl border border-(--border) bg-(--background) p-3">
        {messages.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Faça sua primeira pergunta para começar a conversa.
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground'
                  : 'bg-card text-foreground border border-(--border)'
              }`}
            >
              {message.content}
            </div>
          ))
        )}

        {isLoading && (
          <div className="max-w-[90%] rounded-2xl border border-(--border) bg-card px-3 py-2 text-sm text-muted-foreground">
            O Educador Financeiro está respondendo...
          </div>
        )}
      </div>

      {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Ex.: Como posso reduzir minhas despesas fixas?"
          className="flex-1"
        />
        <Button
          type="submit"
          variant="primary"
          icon={SendHorizonal}
          disabled={isLoading || !inputValue.trim()}
        >
          Enviar
        </Button>
      </form>
    </section>
  );
}
