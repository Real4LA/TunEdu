import { writeBatch, doc, DocumentData, getDocs, collection } from 'firebase/firestore';
import { db } from './config';
import { levels, classYears, subjects, lessons, recordedSessions, exercises, mockUser as user, comments } from '@/lib/data';
import type { User } from '@/lib/types';


async function seedCollection(collectionName: string, data: DocumentData[]) {
    try {
        const collectionRef = collection(db, collectionName);
        const querySnapshot = await getDocs(collectionRef);
        
        if (!querySnapshot.empty) {
            console.log(`Collection "${collectionName}" already contains data. Skipping seeding.`);
            return;
        }

        const batch = writeBatch(db);
        data.forEach((item) => {
            const docRef = doc(collectionRef, item.id);
            batch.set(docRef, item);
        });
        await batch.commit();
        console.log(`Seeded ${data.length} documents into ${collectionName}`);
    } catch (error) {
        console.error(`Error seeding ${collectionName}:`, error);
    }
}

async function seedUser(user: User) {
    try {
        const collectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(collectionRef);
        if (!querySnapshot.empty) {
            console.log(`Collection "users" already contains data. Skipping seeding.`);
            return;
        }

        const batch = writeBatch(db);
        const docRef = doc(collectionRef, user.id);
        batch.set(docRef, user);
        await batch.commit();
        console.log(`Seeded 1 documents into users`);
    } catch (error) {
        console.error(`Error seeding users:`, error);
    }
}


export async function seedDatabase() {
    console.log('Starting database seed...');
    await seedCollection('levels', levels);
    await seedCollection('classYears', classYears);
    await seedCollection('subjects', subjects);
    await seedCollection('lessons', lessons);
    await seedCollection('recordedSessions', recordedSessions);
    await seedCollection('exercises', exercises);
    await seedUser(user);
    await seedCollection('comments', comments);
    console.log('Database seeding finished.');
}
