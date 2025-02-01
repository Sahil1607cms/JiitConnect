import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { getFirestore, collection, query, where, getDocs, addDoc, onSnapshot, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, auth } from '../firebase.js';

const db = getFirestore(app);
const storage = getStorage(app);

const StudyRoom = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [category, setCategory] = useState('college-curriculum');
    const [roomData, setRoomData] = useState({
        course: '',
        sem: '',
        title: '',
        topic: ''
    });
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [currentRoom, setCurrentRoom] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!currentRoom) return;

        const messagesRef = collection(db, 'rooms', currentRoom, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, [currentRoom]);

    const joinRoom = async (e) => {
        e.preventDefault();

        if (!auth.currentUser) return;

        try {
            const roomsRef = collection(db, 'rooms');
            let q;

            if (category === 'college-curriculum') {
                q = query(
                    roomsRef,
                    where('category', '==', 'college-curriculum'),
                    where('course', '==', roomData.course),
                    where('sem', '==', roomData.sem),
                    where('title', '==', roomData.title)
                );
            } else {
                q = query(
                    roomsRef,
                    where('category', '==', 'skills-development'),
                    where('topic', '==', roomData.topic)
                );
            }

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                const newRoom = await addDoc(roomsRef, {
                    ...roomData,
                    category,
                    createdAt: new Date(),
                    createdBy: auth.currentUser.uid
                });
                setCurrentRoom(newRoom.id);
            } else {
                setCurrentRoom(querySnapshot.docs[0].id);
            }
        } catch (error) {
            console.error('Error joining room:', error);
        }
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select an image file (JPEG, PNG, or GIF)');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview({
                url: reader.result,
                file: file
            });
        };
        reader.readAsDataURL(file);
    };

    const cancelImageUpload = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const uploadImage = async () => {
        if (!imagePreview?.file) return;

        setIsUploading(true);
        try {
            const storageRef = ref(storage, `room-images/${currentRoom}/${Date.now()}_${imagePreview.file.name}`);
            await uploadBytes(storageRef, imagePreview.file);
            const downloadURL = await getDownloadURL(storageRef);

            const messagesRef = collection(db, 'rooms', currentRoom, 'messages');
            await addDoc(messagesRef, {
                type: 'image',
                imageUrl: downloadURL,
                userId: auth.currentUser.uid,
                userName: auth.currentUser.displayName || 'Anonymous',
                timestamp: new Date()
            });

            setImagePreview(null);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!currentMessage.trim() || !currentRoom || !auth.currentUser) return;

        try {
            const messagesRef = collection(db, 'rooms', currentRoom, 'messages');
            await addDoc(messagesRef, {
                type: 'text',
                text: currentMessage,
                userId: auth.currentUser.uid,
                userName: auth.currentUser.displayName || 'Anonymous',
                timestamp: new Date()
            });
            setCurrentMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const renderMessage = (message) => {
        const isOwnMessage = message.userId === auth.currentUser?.uid;

        return (
            <div
                key={message.id}
                className={`p-2 rounded ${
                    isOwnMessage ? 'bg-indigo-900 ml-auto' : 'bg-gray-700'
                } max-w-[80%]`}
            >
                <p className="text-sm font-semibold text-gray-300">{message.userName}</p>
                {message.type === 'text' ? (
                    <p className="text-white">{message.text}</p>
                ) : (
                    <img
                        src={message.imageUrl}
                        alt="Shared image"
                        className="max-w-full h-auto rounded mt-1 max-h-64 object-contain"
                        loading="lazy"
                    />
                )}
                <p className="text-xs text-gray-400">
                    {message.timestamp.toDate().toLocaleString()}
                </p>
            </div>
        );
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen w-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Login</h2>
                    <p className="text-gray-300">You need to be logged in to access study rooms.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
            {!currentRoom ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg space-y-6">
                    <h2 className="text-4xl font-bold mb-6">Find Study Buddies</h2>
                    <p className="text-lg mb-8 text-gray-300">Search for students based on your category of interest!</p>

                    <form onSubmit={joinRoom} className="space-y-6">
                        <div>
                            <label htmlFor="category" className="block text-sm text-gray-300 mb-2">Select Category</label>
                            <select
                                id="category"
                                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="college-curriculum">College Curriculum</option>
                                <option value="skills-development">Skills Development</option>
                            </select>
                        </div>

                        {category === 'college-curriculum' ? (
                            <>
                                <div>
                                    <label htmlFor="course" className="block text-sm text-gray-300 mb-2">Enter Course</label>
                                    <input
                                        type="text"
                                        id="course"
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                                        placeholder="e.g. Math 101"
                                        value={roomData.course}
                                        onChange={(e) => setRoomData({...roomData, course: e.target.value})}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="sem" className="block text-sm text-gray-300 mb-2">Enter Semester</label>
                                    <input
                                        type="number"
                                        id="sem"
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                                        placeholder="e.g. 3"
                                        min="1"
                                        value={roomData.sem}
                                        onChange={(e) => setRoomData({...roomData, sem: e.target.value})}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="title" className="block text-sm text-gray-300 mb-2">Enter Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                                        placeholder="e.g. Differential Equations Study Group"
                                        value={roomData.title}
                                        onChange={(e) => setRoomData({...roomData, title: e.target.value})}
                                        required
                                    />
                                </div>
                            </>
                        ) : (
                            <div>
                                <label htmlFor="topic" className="block text-sm text-gray-300 mb-2">Enter Topic</label>
                                <input
                                    type="text"
                                    id="topic"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white"
                                    placeholder="e.g. Python Programming"
                                    value={roomData.topic}
                                    onChange={(e) => setRoomData({...roomData, topic: e.target.value})}
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md font-semibold transition-all"
                        >
                            Join/Create Room
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-4">
                    <div className="h-96 overflow-y-auto border border-gray-700 rounded p-4 space-y-2">
                        {messages.map(message => renderMessage(message))}
                    </div>
                    <div className="space-y-2">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            ref={fileInputRef}
                            className="hidden"
                            id="image-upload"
                        />

                        {imagePreview && (
                            <div className="relative border border-gray-700 rounded-lg p-4 mt-2">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-gray-300">Image Preview</h3>
                                    <button
                                        onClick={cancelImageUpload}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <img
                                    src={imagePreview.url}
                                    alt="Preview"
                                    className="max-h-48 object-contain rounded"
                                />
                                <button
                                    onClick={uploadImage}
                                    disabled={isUploading}
                                    className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                                >
                                    {isUploading ? 'Uploading...' : 'Send Image'}
                                </button>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => document.getElementById('image-upload').click()}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md shadow-md font-semibold transition-all"
                                disabled={isUploading}
                            >
                                {isUploading ? 'Uploading...' : '📎'}
                            </button>
                            <form onSubmit={sendMessage} className="flex gap-2 flex-1">
                                <input
                                    type="text"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded text-white"
                                    placeholder="Type your message..."
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md font-semibold transition-all"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyRoom;