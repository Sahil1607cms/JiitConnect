import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, getDocs, orderBy } from 'firebase/firestore';
import { Users, BookOpen, Clock, Calendar } from 'lucide-react';
import { app } from '../firebase.js';

const db = getFirestore(app);

const AvailableRooms = ({ onRoomSelect }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsRef = collection(db, 'rooms');
                const q = query(roomsRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const roomsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate()
                }));

                setRooms(roomsData);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const filteredRooms = rooms.filter(room => {
        if (filter === 'all') return true;
        return room.category === filter;
    });

    const getTimeAgo = (date) => {
        if (!date) return 'Unknown time';

        const seconds = Math.floor((new Date() - date) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' years ago';

        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' months ago';

        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' days ago';

        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' hours ago';

        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minutes ago';

        return Math.floor(seconds) + ' seconds ago';
    };

    if (loading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="text-gray-400">Loading available rooms...</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Available Study Rooms</h2>
                <div className="flex gap-2">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
                    >
                        <option value="all">All Categories</option>
                        <option value="college-curriculum">College Curriculum</option>
                        <option value="skills-development">Skills Development</option>
                    </select>
                </div>
            </div>

            {filteredRooms.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-lg">
                    <p className="text-gray-400">No study rooms available in this category</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRooms.map(room => (
                        <div
                            key={room.id}
                            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
                            onClick={() => onRoomSelect(room.id)}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
                                    {room.category === 'college-curriculum' ? 'College' : 'Skills'}
                                </span>
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                    <Clock size={14} />
                                    {getTimeAgo(room.createdAt)}
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2">
                                {room.category === 'college-curriculum' ? room.title : room.topic}
                            </h3>

                            {room.category === 'college-curriculum' && (
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <BookOpen size={16} />
                                        <span>{room.course}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Calendar size={16} />
                                        <span>Semester {room.sem}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-gray-400 mt-4">
                                <Users size={16} />
                                <span>Active participants</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableRooms;