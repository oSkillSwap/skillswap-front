import React, { useState } from 'react';
import './AvailabilityEditor.scss';

const days = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
];
const slots = ['matin', 'midi', 'après-midi', 'soir'];

interface Availability {
  day_of_the_week: string;
  time_slot: string;
}

interface Props {
  initialAvailabilities: Availability[];
  onSave: (availabilities: Availability[]) => void;
  editable: boolean;
}

function AvailabilityEditor({
  initialAvailabilities,
  onSave,
  editable,
}: Props) {
  const [matrix, setMatrix] = useState(() => {
    const base: Record<string, Record<string, boolean>> = {};
    for (const day of days) {
      base[day] = {};
      for (const slot of slots) {
        base[day][slot] = false;
      }
    }

    for (const { day_of_the_week, time_slot } of initialAvailabilities) {
      base[day_of_the_week][time_slot] = true;
    }

    return base;
  });

  const toggle = (day: string, slot: string) => {
    setMatrix((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: !prev[day][slot] },
    }));
  };

  const handleSave = () => {
    const selected: Availability[] = [];
    for (const day of days) {
      for (const slot of slots) {
        if (matrix[day][slot]) {
          selected.push({ day_of_the_week: day, time_slot: slot });
        }
      }
    }
    onSave(selected);
  };

  return (
    <div className="availability-editor">
      <div className="profile-availability">
        <div />
        {days.map((day) => (
          <div key={day} className="profile-availability-day">
            {day}
          </div>
        ))}

        {slots.map((slot) => (
          <React.Fragment key={slot}>
            <div className="profile-availability-slot">{slot}</div>
            {days.map((day) => {
              const active = matrix[day][slot];
              return editable ? (
                <button
                  key={`${day}-${slot}`}
                  type="button"
                  className={`profile-availability-check ${active ? 'active' : ''}`}
                  onClick={() => toggle(day, slot)}
                  aria-pressed={active}
                >
                  <span className="sr-only">
                    {active ? 'Désactiver' : 'Activer'} {slot} {day}
                  </span>
                </button>
              ) : (
                <div
                  key={`${day}-${slot}`}
                  className={`profile-availability-check ${active ? 'active' : ''}`}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {editable && (
        <button
          type="button"
          className="btn btn-default save-availabilities"
          onClick={handleSave}
        >
          Enregistrer les disponibilités
        </button>
      )}
    </div>
  );
}

export default AvailabilityEditor;
