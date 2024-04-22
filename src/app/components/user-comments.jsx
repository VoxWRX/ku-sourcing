
import React, { useState, useEffect, useContext } from 'react';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { IoIosChatbubbles } from "react-icons/io";

const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { currentUser } = useContext(AuthContext);

    // Reference to the comments collection in Firestore
    const commentsRef = collection(db, 'comments');

    useEffect(() => {
        if (!currentUser) {
            setComments([]); // Reset comments when there is no user
            return;
        }

        // Create a query against the collection.
        const q = query(collection(db, 'comments'), where("userId", "==", currentUser.uid));

        // Real-time update listener for the comments.
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const commentsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setComments(commentsData);
        });

        // Clean up listener on unmount
        return () => unsubscribe();
    }, [currentUser]);

    const handlePostComment = async () => {
        if (!currentUser || newComment.trim() === '') return;

        try {
            // Add a new document with a generated id.
            await addDoc(collection(db, 'comments'), {
                text: newComment,
                createdAt: new Date(), // Consider using serverTimestamp here for consistency
                userId: currentUser.uid,
                userName: currentUser.familyName || currentUser.email,
            });

            setNewComment('');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div className="flex flex-col space-y-4 p-6 mx-auto">
            <h2 className='text-gray-600 font-bold flex text-3xl'>Admin Chat <IoIosChatbubbles className="ml-4" /> </h2>
            {currentUser && (
                <div className="space-y-4 max-h-96 overflow-y-auto divide-y divide-gray-200">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border p-4 bg-white rounded-md shadow-lg">
                            <p className="font-semibold">{comment.userName}</p>
                            <p className='text-gray-600'>{comment.text}</p>
                            {/* Displaying replies here */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-4">
                                    <p className="font-semibold">Replies:</p>
                                    {comment.replies.map((reply, index) => (
                                        <div key={index} className="ml-4 mt-2 bg-gray-100 p-2 rounded">
                                            <p className="text-sm font-bold">{reply.replierName}</p>
                                            <p className="text-sm">{reply.text}</p>
                                            {/* Optionally format the date */}
                                            <p className="text-xs text-gray-500">{reply.createdAt.toDate().toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {!currentUser && <div>Please log in to see your comments.</div>}

            <div className="flex mt-2 space-x-8">
                <textarea
                    className="w-full border border-gray-200 rounded-lg p-2 text-gray-700 focus:outline-none focus:border-blue-300"
                    placeholder="Write a comment..."
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                    className="my-6 bg-blue-400 hover:bg-blue-600 text-white font-semibold px-4 rounded-lg focus:outline-none shadow-md"
                    onClick={handlePostComment}
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export default CommentsSection;
