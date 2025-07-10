import React, { useState, useEffect } from 'react';
import { Button, FullPageError, LoadingPage, Title } from '@/components';
import { useAttendanceInit,useToggleAttendance } from '../../api';
import { CreateAttendanceRequest } from '../../types';
import { getDistanceInMeters } from '@/lib/getDistanceInMeters';
import MapComponent from '@/components/map';

export function AttendanceWrapper() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number}>()
  const [error, setError] = useState<string>();

  const {
    data: init,
    isLoading: initLoading,
    isError: initError,
    error: initErrorObj,
  } = useAttendanceInit()

  const toggle = useToggleAttendance();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setCoords({ latitude: coords.latitude, longitude: coords.longitude }),
      err => setError(err.message),
      { enableHighAccuracy: true }
    )
  }, [])

  if (initLoading) return <LoadingPage />
  if (initError)
    return (
      <FullPageError error={initErrorObj} />
    )
  if (!init) return null

  const {
    latitude: rtuLat,
    longitude: rtuLng,
    radius,
    shiftStart: isoShiftStart,
    shiftEnd: isoShiftEnd,
    checkedIn: isoCheckedIn,
    checkedOut: isoCheckedOut,
  } = init

  const shiftStart = new Date(isoShiftStart);
  const shiftEnd = new Date(isoShiftEnd);
  const checkedIn = isoCheckedIn ? new Date(isoCheckedIn) : undefined;
  const checkedOut = isoCheckedOut ? new Date(isoCheckedOut) : undefined;

  const now = new Date();

  const windowStart = new Date(shiftStart.getTime() - 2 * 3600_000);
  const inWindows = now >= windowStart && now <= shiftEnd;

  const inRange = coords && getDistanceInMeters(
    coords.latitude,
    coords.longitude,
    rtuLat,
    rtuLng
  ) <= radius;

  const isCheckedIn = Boolean(checkedIn && !checkedOut);
  const isCheckedOut = Boolean(checkedOut);

  const btnDisabled =
    !coords ||
    !inRange ||
    toggle.isPending ||
    (!isCheckedIn && !inWindows) ||
    isCheckedOut;

  const btnLabel = toggle.isPending ? 'Processing…' : isCheckedIn ? 'Check Out' : 'Check In';

  const handleToggle = () => {
    if (!coords) return
    const payload: CreateAttendanceRequest = {
      latitude:  coords.latitude,
      longitude: coords.longitude,
    }
    toggle.mutate(payload, {
      onError: err => setError(err.message),
    })
  }

  const fmtTime = (d?: Date) =>
    d ? d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }) : '';
  
    const jakartaTz = "Asia/Jakarta";

  const todayStr = now.toLocaleDateString("id-ID", {
    timeZone: jakartaTz,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const cloclkStr = now.toLocaleTimeString("id-ID", {
    timeZone: jakartaTz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="flex flex-col w-full h-full">
      {/* Top pane */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
        <Title isButton backHref='/homepage' text="Absensi" />
        <div className='flex gap-4 text-sm text-gray-600'>
           <span>
              Date: {todayStr}
            </span>
            <span>
              Shift: {fmtTime(shiftStart)} – {fmtTime(shiftEnd)}
            </span>
        </div>
        <span className="text-4xl mb-4">
          {cloclkStr}
        </span>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          onClick={handleToggle}
          disabled={btnDisabled}
        >
          {btnLabel}
        </Button>
        <span>Current Position: {coords?.latitude}, {coords?.longitude}</span>
      </div>

      {/* Map */}
      <div className="h-96">
        <MapComponent
          center={[rtuLat, rtuLng]}
          userPosition={coords ? [coords.latitude, coords.longitude] : undefined}
          radius={radius}
          zoom={15}
        />
      </div>

      {/* History */}
      <div className="p-4">
        <div className='flex flex-col w-full items-center mb-4'>
          <div className='flex flex-col items-center mb-2'>
            <h1>Check In</h1>
            <span>{fmtTime(checkedIn)}</span>
          </div>
          <div className='flex flex-col items-center mb-2'>
            <h1>Check Out</h1>
            <span>{fmtTime(checkedOut)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

