import { Card } from './ui/card';
import { Button } from './ui/button';
import { getCurrentValue, getRandomTasks } from '../lib/values';
import { CheckCircle2, ListTodo, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

interface TaskListProps {
  onTaskSelect: (taskIndex: number) => void;
}

export function TaskList({ onTaskSelect }: TaskListProps) {
  const currentValue = getCurrentValue();

  // Generate random tasks once when component mounts
  const randomTasks = useMemo(() => {
    if (!currentValue) return [];
    return getRandomTasks(currentValue.allTasks);
  }, [currentValue?.name]); // Re-generate only if the value changes

  const gradients = [
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500'
  ];

  if (!currentValue) {
    return (
      <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-blue-200">
        <p className="text-center text-muted-foreground font-body">
          Задания доступны только в рабочие дни недели (понедельник-суббота).
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-white to-cyan-50 shadow-2xl border-4 border-cyan-400/50 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 rounded-xl shadow-lg">
          <ListTodo className="w-8 h-8" />
          <h3 className="text-2xl font-heading">Выберите одно задание для выполнения:</h3>
        </div>

        <div className="space-y-6">
          {randomTasks.map((task, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-transparent"
            >
              {/* Task number badge */}
              <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-full flex items-center justify-center text-white shadow-lg`}>
                <span className="text-xl">{index + 1}</span>
              </div>

              <div className="flex items-start gap-4 ml-6">
                <CheckCircle2 className="w-7 h-7 flex-shrink-0 mt-1 text-gray-400" />
                <div className="flex-1">
                  <p className="mb-4 text-gray-700 leading-relaxed font-body">{task}</p>
                  <Button
                    onClick={() => onTaskSelect(index)}
                    className={`bg-gradient-to-r ${gradients[index]} hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all duration-300 font-body`}
                    size="sm"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Выбрать это задание
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
