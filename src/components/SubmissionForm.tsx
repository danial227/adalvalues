import { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getCurrentValue, getRandomTasks } from '../lib/values';
import { ArrowLeft, Upload, CheckCircle, Image, Video, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SubmissionFormProps {
  taskIndex: number | null;
  onBack: () => void;
}

export function SubmissionForm({ taskIndex, onBack }: SubmissionFormProps) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);
  const [videoFiles, setVideoFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentValue = getCurrentValue();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lastName || !firstName) {
      toast.error('Пожалуйста, заполните фамилию и имя');
      return;
    }

    if (!photoFiles && !videoFiles) {
      toast.error('Пожалуйста, прикрепите хотя бы одно фото или видео');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast.success('Задание успешно отправлено!', {
        description: 'Спасибо за выполнение задания программы "Адал Азамат"'
      });
      setIsSubmitting(false);
      
      // Reset form
      setLastName('');
      setFirstName('');
      setPhotoFiles(null);
      setVideoFiles(null);
      
      // Reset file inputs
      const photoInput = document.getElementById('photo-upload') as HTMLInputElement;
      const videoInput = document.getElementById('video-upload') as HTMLInputElement;
      if (photoInput) photoInput.value = '';
      if (videoInput) videoInput.value = '';
      
      setTimeout(() => {
        onBack();
      }, 1500);
    }, 1500);
  };

  if (!currentValue || taskIndex === null) {
    return null;
  }

  // Get the same random tasks as TaskList component
  const randomTasks = useMemo(() => {
    if (!currentValue) return [];
    return getRandomTasks(currentValue.allTasks);
  }, [currentValue?.name]);

  const selectedTask = randomTasks[taskIndex] || '';

  return (
    <Card className="p-8 bg-gradient-to-br from-white to-purple-50 shadow-2xl border-4 border-purple-400/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-purple-100 group font-body"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Назад к заданиям
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-heading">Выбранное задание:</h3>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-xl shadow-lg">
            <div className="bg-white p-5 rounded-lg">
              <p className="text-gray-700 font-body">{selectedTask}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-1 rounded-xl shadow-lg">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg text-blue-600 font-heading">Личная информация</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 font-body">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Введите фамилию"
                    required
                    className="border-2 border-blue-200 focus:border-blue-500 transition-colors font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 font-body">Имя</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Введите имя"
                    required
                    className="border-2 border-blue-200 focus:border-blue-500 transition-colors font-body"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-1 rounded-xl shadow-lg">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Image className="w-5 h-5 text-green-600" />
                <Label htmlFor="photo-upload" className="text-lg text-green-600 font-heading">Фотографии выполнения</Label>
              </div>
              <div className="border-4 border-dashed border-green-300 rounded-xl p-8 hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-center group cursor-pointer">
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setPhotoFiles(e.target.files)}
                  className="cursor-pointer font-body"
                />
                <p className="text-sm text-gray-600 mt-3 font-body">
                  {photoFiles && photoFiles.length > 0
                    ? `✅ Выбрано файлов: ${photoFiles.length}`
                    : '📸 Можно выбрать несколько фотографий'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded-xl shadow-lg">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-orange-600" />
                <Label htmlFor="video-upload" className="text-lg text-orange-600 font-heading">Видео выполнения</Label>
              </div>
              <div className="border-4 border-dashed border-orange-300 rounded-xl p-8 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 text-center group cursor-pointer">
                <Input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => setVideoFiles(e.target.files)}
                  className="cursor-pointer font-body"
                />
                <p className="text-sm text-gray-600 mt-3 font-body">
                  {videoFiles && videoFiles.length > 0
                    ? `✅ Выбрано файлов: ${videoFiles.length}`
                    : '🎥 Можно выбрать несколько видео'}
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] py-6 text-lg font-heading"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Upload className="w-5 h-5 mr-2 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Отправить выполненное задание
              </>
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}
