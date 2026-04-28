import { messaging } from '../firebase';
import { getToken, onMessage } from 'firebase/messaging';

const VAPID_KEY = 'BK80D8C9ir-Wc9f8iOMNeVzKKbCcSgq3FaD6hyqlv5zxax-_9zbPbCLK6wi50mvhdNaEDzTZF-jEthvLyfH9rm4';

// 🔔 Request notification permission
export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });

      console.log('FCM Token:', token);
      return token;
    }

    return null;
  } catch (error) {
    console.error('Notification error:', error);
    return null;
  }
}

// 📩 Listen for foreground messages
export function listenForForegroundMessages(callback) {
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
}

// 🚨 Risk zone detection
export function checkZoneEntry(userLocation, reports, onEnterRiskZone) {
  const RADIUS_METERS = 300;
  const THRESHOLD = 2;

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const nearby = reports.filter((r) =>
    getDistance(
      userLocation.lat,
      userLocation.lng,
      r.location.lat,
      r.location.lng
    ) <= RADIUS_METERS
  );

  if (nearby.length >= THRESHOLD) {
    onEnterRiskZone(nearby.length);
  }
}