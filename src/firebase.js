import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBGZ4gDjW70lAK7phvxuW1z_nd50HlmGho',
	authDomain: 'todo-s-list-3b876.firebaseapp.com',
	projectId: 'todo-s-list-3b876',
	storageBucket: 'todo-s-list-3b876.appspot.com',
	messagingSenderId: '433769665593',
	appId: '1:433769665593:web:6746002fb17649379be9e8',
	databaseURL:
		'https://todo-s-list-3b876-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
