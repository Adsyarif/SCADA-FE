import React, { useState, useEffect } from 'react';
import { Button, Title } from '@/components';
import { MapComponent } from '../map';
import { useAttendanceLog, useToggleAttendance } from '../../api';
import { AttendanceItem, CreateAttendanceRequest } from '../../types';

export function AttendanceWrapper() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>();
  const [error, setError] = useState<string>();
  const toggle = useToggleAttendance();
  const { data: log = [] } = useAttendanceLog();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setCoords({ latitude: coords.latitude, longitude: coords.longitude }),
      err => setError(err.message),
      { enableHighAccuracy: true }
    );
  }, []);

  // 2) determine if currently checked in or not by peeking last record
  const last = log[0];
  const isCheckedIn = Boolean(last && !toggle.isPending && !toggle.isError && last);

  // 3) click handler
  const handleToggle = () => {
    if (!coords) return;
    const payload: CreateAttendanceRequest = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    toggle.mutate(payload, { onError: err => setError(err.message) });
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Top pane */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
        <Title text="Absensi" />
        <span>{new Date().toLocaleDateString()}</span>
        <span className="text-6xl mb-4">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          onClick={handleToggle}
          disabled={!coords || toggle.isPending}
        >
          {toggle.isPending
            ? 'Processing…'
            : isCheckedIn
            ? 'Check Out'
            : 'Check In'}
        </Button>
      </div>

      {/* Map */}
      <div className="h-96">
        <MapComponent/>
      </div>

      {/* History */}
      <div className="p-4">
        <Title text="History" />
        <ul className="space-y-1 max-h-64 overflow-y-auto">
          {log.map((e: AttendanceItem) => (
            <li key={e.createDate} className="flex justify-between border-b py-1">
              <span>{e.staffName}</span>
              <span>
                {new Date(e.createDate).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

