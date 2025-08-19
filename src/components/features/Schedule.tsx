import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as RBC from 'react-big-calendar';
import { dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import {enUS} from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';
import { ScheduleForm } from './ScheduleForm';
import { ScheduledWorkout } from '../services/types';
import { getWorkoutById } from '../services/workoutService';


const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const STORAGE_KEY = 'ft_schedule_events_v1';

const parseStoredEvents = (raw: any): ScheduledWorkout[] => {
  if (!Array.isArray(raw)) return [];
  return raw.map((e) => ({
    ...e,
    start: e.start ? new Date(e.start) : null,
    end: e.end ? new Date(e.end) : null,
  }));
};

export const Schedule: React.FC = () => {
  const [events, setEvents] = useState<ScheduledWorkout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setEvents(parseStoredEvents(parsed));
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore storage errors
    }
  }, [events]);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo | Date) => {
    let start: Date | null = null;
    if (slotInfo instanceof Date) {
      start = slotInfo;
    } else if (slotInfo && typeof slotInfo === 'object') {
      // SlotInfo has .start (and .end) in most cases
      // @ts-ignore - be defensive about shape
      const s = (slotInfo as any).start ?? (slotInfo as any);
      start = s ? new Date(s) : null;
    }
    setSelectedDate(start ?? new Date());
    setIsModalOpen(true);
  }, []);

  const handleSaveSchedule = useCallback(
    ({ workoutId, date, recurring }: { workoutId: number; date: Date; recurring: boolean }) => {
      const workout = getWorkoutById(workoutId);
      if (!workout) return;
      const newEvent: ScheduledWorkout = {
        id: new Date().toISOString(),
        title: workout.name,
        start: date,
        end: date,
        workoutId,
        recurring,
      };
      setEvents((prev) => {
        const next = [...prev, newEvent];
        // keep events sorted by start date
        next.sort((a, b) => {
          const ta = a.start ? (a.start as Date).getTime() : 0;
          const tb = b.start ? (b.start as Date).getTime() : 0;
          return ta - tb;
        });
        return next;
      });
      setIsModalOpen(false);
    },
    []
  );

  const upcomingWorkouts = useMemo(() => {
    const now = Date.now();
    return events
      .filter((ev) => ev.start instanceof Date && ev.start.getTime() > now)
      .sort((a, b) => (a.start as Date).getTime() - (b.start as Date).getTime())
      .slice(0, 5);
  }, [events]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Workout Schedule</h1>
        <Button
          onClick={() => {
            setSelectedDate(new Date());
            setIsModalOpen(true);
          }}
        >
          Schedule Workout
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule a Workout">
        <ScheduleForm onSave={handleSaveSchedule} onClose={() => setIsModalOpen(false)} selectedDate={selectedDate} />
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            {/*
              react-big-calendar's exported Calendar sometimes causes
              'cannot be used as a JSX component' with TS. Create a typed
              wrapper alias to satisfy JSX typing.
            */}
            {(() => {
              const Calendar = RBC.Calendar as unknown as React.ComponentType<any>;
              return (
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 600 }}
                  selectable={true}
                  onSelectSlot={handleSelectSlot}
                  onDoubleClickEvent={() => {}}
                />
              );
            })()}
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Workouts</h2>
          <div className="space-y-4">
            {upcomingWorkouts.map((event) => (
              <Card key={event.id}>
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-gray-500">{format(new Date(event.start as Date), 'MMMM d, yyyy')}</p>
              </Card>
            ))}
            {upcomingWorkouts.length === 0 && <p className="text-gray-500">No upcoming workouts scheduled.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};