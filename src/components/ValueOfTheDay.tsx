import { Card } from './ui/card';
import { getCurrentValue, getDateInfo } from '../lib/values';
import { Calendar, Heart, Star } from 'lucide-react';

export function ValueOfTheDay() {
  const dateInfo = getDateInfo();
  const currentValue = getCurrentValue();

  return (
    <Card className="p-8 mb-8 bg-gradient-to-br from-white to-blue-50 shadow-2xl border-4 border-yellow-400/50 relative overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-tr-full"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-xl shadow-lg">
          <Calendar className="w-6 h-6" />
          <div>
            <p className="opacity-90 font-body">{dateInfo.dayName}</p>
            <p className="font-body">{dateInfo.fullDate}</p>
          </div>
        </div>

        {dateInfo.isWeekend ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full">
              <Star className="w-5 h-5" />
              <p className="font-body">Сегодня воскресенье. Программа работает с понедельника по субботу.</p>
            </div>
          </div>
        ) : currentValue ? (
          <div className="flex items-start gap-4">
            <Heart className="w-12 h-12 text-red-500 drop-shadow-lg flex-shrink-0" fill="currentColor" />
            <div className="flex-1">
              <h3 className="text-sm text-blue-600 mb-2 uppercase tracking-wide font-body">Ценность дня:</h3>
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                <h2 className="text-4xl font-heading">{currentValue.name}</h2>
              </div>
              <div className="mt-4 flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full flex-1 ${
                      i < currentValue.dayOfWeek ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body">
              Нет запланированной ценности на сегодня.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
