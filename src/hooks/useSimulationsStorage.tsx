import { type SimulationFormData, type SimulationRecord } from '@/data/simulation';

const LOCAL_STORAGE_KEY = 'simulation-data';

const readStoredSimulations = () => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!storage) {
    return [] as SimulationRecord[];
  }

  return JSON.parse(storage) as SimulationRecord[];
};

export const useSimulationStorage = () => {
  const readStored = () => readStoredSimulations();

  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID();
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
    };
    const savedData = readStoredSimulations();

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...savedData, record]));
    return id;
  };

  const getFormData = (id: string) => {
    const savedData = readStored();
    return savedData.find((record) => record.id === id) || null;
  };

  const getAllFormData = () => {
    const savedData = readStored();

    return [...savedData].sort((a, b) => {
      const left = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const right = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return right - left;
    });
  };

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const savedData = readStored();

    const updated = savedData.map((record) => (record.id === id ? { ...data } : record));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteSimulation = (id: string) => {
    const savedData = readStored();
    const updated = savedData.filter((record) => record.id !== id);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return { saveFormData, getFormData, getAllFormData, updateSimulation, deleteSimulation };
};
