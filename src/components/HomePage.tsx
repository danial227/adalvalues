import { Card } from './ui/card';
import { Button } from './ui/button';
import { getCurrentValue, getDateInfo } from '../lib/values';
import { Calendar, Heart, Star, ArrowRight, Target, Lightbulb } from 'lucide-react';

interface HomePageProps {
  onStartTasks: () => void;
}

export function HomePage({ onStartTasks }: HomePageProps) {
  const dateInfo = getDateInfo();
  const currentValue = getCurrentValue();

  if (dateInfo.isWeekend) {
    return (
      <div className="space-y-8">
        <Card className="p-12 bg-gradient-to-br from-white to-purple-50 shadow-2xl border-4 border-purple-400/50 text-center">
          <Star className="w-20 h-20 text-purple-500 mx-auto mb-6" />
          <h2 className="text-4xl mb-4 font-heading">Выходной день</h2>
          <p className="text-xl text-muted-foreground font-body">
            Сегодня воскресенье. Программа работает с понедельника по субботу.
          </p>
          <p className="mt-4 text-lg text-muted-foreground font-body">
            Отдохните и возвращайтесь в понедельник для новых заданий!
          </p>
        </Card>
      </div>
    );
  }

  if (!currentValue) {
    return (
      <Card className="p-12 bg-white shadow-2xl text-center">
        <p className="text-xl text-muted-foreground font-body">
          Нет запланированной ценности на сегодня.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Date and Value Card */}
      <Card className="p-10 bg-gradient-to-br from-white to-blue-50 shadow-2xl border-4 border-yellow-400/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/10 rounded-tr-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl shadow-lg">
            <Calendar className="w-7 h-7" />
            <div>
              <p className="text-lg opacity-90 font-body">{dateInfo.dayName}</p>
              <p className="text-lg font-body">{dateInfo.fullDate}</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 mb-6">
              <Heart className="w-16 h-16 text-red-500 drop-shadow-lg" fill="currentColor" />
            </div>
            <h3 className="text-lg text-blue-600 mb-3 uppercase tracking-wide font-body">Ценность дня:</h3>
            <h2 className="text-5xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 font-heading">
              {currentValue.name}
            </h2>
            
            {/* Progress bar */}
            <div className="flex gap-2 max-w-md mx-auto mb-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full flex-1 ${
                    i < currentValue.dayOfWeek ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>

            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-body">
              {currentValue.description}
            </p>
          </div>
        </div>
      </Card>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 hover:shadow-xl transition-shadow">
          <Target className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-2xl mb-3 text-purple-700 font-heading">Цель дня</h3>
          <p className="text-gray-700 leading-relaxed font-body">
            Выполните одно из трех предложенных заданий, которое поможет вам лучше понять и применить на практике ценность "{currentValue.name}".
          </p>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300 hover:shadow-xl transition-shadow">
          <Lightbulb className="w-12 h-12 text-cyan-600 mb-4" />
          <h3 className="text-2xl mb-3 text-cyan-700 font-heading">Как это работает</h3>
          <p className="text-gray-700 leading-relaxed font-body">
            Выберите задание, выполните его, затем загрузите фото или видео вашей работы. Каждое задание — это шаг к становлению настоящим гражданином!
          </p>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="p-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl border-4 border-yellow-400">
        <div className="text-center">
          <h3 className="text-3xl mb-4 font-heading">Готовы начать?</h3>
          <p className="text-xl mb-8 opacity-90 font-body">
            Выберите одно из трех заданий и покажите свою приверженность ценностям программы "Адал Азамат"
          </p>
          <Button
            onClick={onStartTasks}
            size="lg"
            className="bg-white text-blue-600 hover:bg-yellow-400 hover:text-blue-700 text-xl px-12 py-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-heading"
          >
            Перейти к заданиям
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
