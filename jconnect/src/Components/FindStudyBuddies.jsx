import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc, onSnapshot, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, auth } from '../firebase.js';
import Rooms from "./AvailRooms.jsx"

const db = getFirestore(app);
const storage = getStorage(app);

const FindStudyBuddies = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [category, setCategory] = useState('college-curriculum');
  const [roomData, setRoomData] = useState({
    course: '',
    sem: '',
    title: '',
    topic: '',
  });
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [RenderRooms, setRenderRooms] = useState(<Rooms/>);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
    if(!currentRoom)
      setRenderRooms(<Rooms/>)
    else setRenderRooms(null);
  },[currentRoom])

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

  const sendMessage = async (e) => {
    e.preventDefault();

    if ((!currentMessage.trim() && !selectedImage) || !currentRoom || !auth.currentUser) return;

    try {
      setIsUploading(true);
      const messagesRef = collection(db, 'rooms', currentRoom, 'messages');

      let imageUrl = null;
      if (selectedImage) {
        const storageRef = ref(storage, `rooms/${currentRoom}/images/${Date.now()}_${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(messagesRef, {
        text: currentMessage,
        imageUrl,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous',
        timestamp: new Date(),
        type: imageUrl ? 'image' : 'text'
      });

      setCurrentMessage('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageSelect = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

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

                {category === 'college-curriculum' && (
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
                )}

                {category === 'skills-development' && (
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
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`p-2 rounded ${
                            message.userId === auth.currentUser.uid
                                ? 'bg-indigo-900 ml-auto'
                                : 'bg-gray-700'
                        } max-w-[80%]`}
                    >
                      <p className="text-sm font-semibold text-gray-300">{message.userName}</p>
                      {message.text && <p className="text-white">{message.text}</p>}
                      {message.imageUrl && (
                          <img
                              src={message.imageUrl}
                              alt="Shared image"
                              className="max-w-full h-auto rounded mt-2"
                              loading="lazy"
                          />
                      )}
                      <p className="text-xs text-gray-400">
                        {message.timestamp.toDate().toLocaleString()}
                      </p>
                    </div>
                ))}
              </div>
              <form onSubmit={sendMessage} className="space-y-2">
                <div className="flex gap-2">
                  <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded text-white"
                      placeholder="Type your message..."
                  />
                  <button
                      type="submit"
                      disabled={isUploading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-md font-semibold transition-all disabled:opacity-50"
                  >
                    {isUploading ? 'Sending...' : 'Send'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="text-sm text-gray-300"
                  />
                  {selectedImage && (
                      <span className="text-sm text-gray-300">
                  Selected: {selectedImage.name}
                </span>
                  )}
                </div>
              </form>
            </div>
        )}
        {RenderRooms}
      </div>
  );
};

export default FindStudyBuddies;