import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/storage';

try {
  if (!firebase.apps.length) firebase.initializeApp(credentials);
} catch (err) {
  console.log('firebase error', err);
}

export const db = firebase.database();
export const storage = firebase.storage();
