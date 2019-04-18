import config from '../config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var localConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId
};
firebase.initializeApp(localConfig);

export default firebase;