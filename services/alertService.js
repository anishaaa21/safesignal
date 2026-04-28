const { addDoc, collection } = require("firebase/firestore");
const { db } = require("../src/firebase.js"); // ✅ correct path

// 🚨 Create Emergency Alert
const createAlert = async (userId, location) => {
  try {
    const alertData = {
      userId: userId,
      location: {
        lat: location.lat,
        lng: location.lng,
      },
      status: "active",
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, "alerts"), alertData);

    return {
      success: true,
      alertId: docRef.id,
      message: "Alert created successfully",
    };
  } catch (error) {
    console.error("Error creating alert:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = { createAlert };