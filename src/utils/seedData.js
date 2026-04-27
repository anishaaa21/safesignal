import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CITY_CENTER = { lat: 12.9716, lng: 77.5946 };

const buildCoords = (baseLat, baseLng, dLat, dLng) => ({
  lat: baseLat + dLat,
  lng: baseLng + dLng,
});

const sampleReports = [
  { location: buildCoords(CITY_CENTER.lat, CITY_CENTER.lng, 0.002, 0.001),  incidentType: 'Harassment',    timeOfDay: 'night',   upvotes: 7, downvotes: 0, description: 'Group of men following women near bus stop' },
  { location: buildCoords(CITY_CENTER.lat, CITY_CENTER.lng, -0.001, 0.003), incidentType: 'Poor Lighting', timeOfDay: 'evening', upvotes: 4, downvotes: 1, description: 'Street lights not working' },
  { location: buildCoords(CITY_CENTER.lat, CITY_CENTER.lng, 0.004, -0.002), incidentType: 'Unsafe Area',   timeOfDay: 'night',   upvotes: 6, downvotes: 0, description: 'Isolated area, no people around' },
  { location: buildCoords(CITY_CENTER.lat, CITY_CENTER.lng, -0.003, -0.001),incidentType: 'Theft',         timeOfDay: 'evening', upvotes: 3, downvotes: 2, description: 'Phone snatching reported' },
  { location: buildCoords(CITY_CENTER.lat, CITY_CENTER.lng, 0.001, 0.005),  incidentType: 'Harassment',    timeOfDay: 'morning', upvotes: 2, downvotes: 0, description: 'Verbal harassment near market' },
  { location: buildCoords(CITY_CENTER.lat, CITY_CENTER.lng, 0.003, 0.002),  incidentType: 'Unsafe Area',   timeOfDay: 'night',   upvotes: 5, downvotes: 1, description: 'Deserted lane near metro station' },
  { location: buildCoords(CITY_CENTER.lat, CITY_CENTER.lng, -0.002, 0.004), incidentType: 'Poor Lighting', timeOfDay: 'evening', upvotes: 3, downvotes: 0, description: 'Broken streetlights on main road' },
  { location: buildCoords(CITY_CENTER.lat, CITY_CENTER.lng, 0.005, 0.003),  incidentType: 'Theft',         timeOfDay: 'morning', upvotes: 2, downvotes: 1, description: 'Bag snatching near park entrance' },
];

export async function runSeed() {
  console.log('🌱 Seeding data...');
  for (const reportItem of sampleReports) {
    await addDoc(collection(db, 'reports'), {
      ...reportItem,
      userId: 'seed-data',
      createdAt: new Date(),
    });
  }
  console.log('✅ Seed complete!');
}