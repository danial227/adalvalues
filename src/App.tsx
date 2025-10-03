import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { TaskList } from './components/TaskList';
import { SubmissionForm } from './components/SubmissionForm';
import { Toaster } from './components/ui/sonner';
import { Sparkles, Home } from 'lucide-react';
import { Button } from './components/ui/button';

type Page = 'home' | 'tasks' | 'submission';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleStartTasks = () => {
    setCurrentPage('tasks');
  };

  const handleTaskSelect = (taskIndex: number) => {
    setSelectedTask(taskIndex);
    setCurrentPage('submission');
  };

  const handleBackToTasks = () => {
    setCurrentPage('tasks');
    setSelectedTask(null);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedTask(null);
  };

  // Reset to home when component mounts
  useEffect(() => {
    setCurrentPage('home');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 py-8 px-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <h1 className="text-5xl text-white drop-shadow-lg font-heading">Неделя ценностей</h1>
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm inline-block px-6 py-3 rounded-full border-2 border-white/30">
            <h2 className="text-2xl text-white font-body">программы "Адал Азамат"</h2>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse"></div>
          </div>
        </header>

        {/* Home button - show only when not on home page */}
        {currentPage !== 'home' && (
          <div className="mb-6">
            <Button
              onClick={handleBackToHome}
              variant="ghost"
              className="text-white hover:bg-white/20 font-body"
            >
              <Home className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </div>
        )}

        {currentPage === 'home' && <HomePage onStartTasks={handleStartTasks} />}
        
        {currentPage === 'tasks' && <TaskList onTaskSelect={handleTaskSelect} />}
        
        {currentPage === 'submission' && (
          <SubmissionForm 
            taskIndex={selectedTask} 
            onBack={handleBackToTasks}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}
