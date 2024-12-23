import type { Timestamp } from 'firebase/firestore';
import type { Data } from '@/core/data';

export interface User extends Data {
	photoURL?: string;
	isOnline: boolean;
	lastSeen: Timestamp;
};
