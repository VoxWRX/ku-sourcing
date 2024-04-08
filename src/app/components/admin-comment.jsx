
import React, { useState, useEffect, useContext } from 'react';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    doc,
    getDoc,
    updateDoc,
    runTransaction,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from '../context/authContext';
import { format } from 'date-fns';

const Comment = ({ comment, onReplySubmit }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [reply, setReply] = useState('');

    // Function to format Firestore Timestamp or JavaScript Date to a readable string
    const formatDate = (date) => {
        if (date?.toDate) {
            return format(date.toDate(), 'PPpp');
        }
        return format(date, 'PPpp');
    };


    return (
        <div className="bg-white rounded-md shadow-lg p-4 space-y-2">
            <p className="text-lg font-semibold">{comment.text}</p>
            <div className="mt-2 text-sm text-gray-600">
                <p>Comment by: <span className="font-semibold">{comment.userName}</span> at <span className="text-gray-500">{formatDate(comment.createdAt)}</span></p>
            </div>
            {comment.replies?.map((reply, index) => (
                <div key={index} className="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
                    <p className="text-sm">{reply.text}</p>
                    <div className="text-xs text-gray-500">
                        Reply by: {reply.replierName} at {formatDate(reply.createdAt)}
                    </div>
                </div>
            ))}
            <button
                className="text-blue-500 hover:text-blue-700 text-sm"
                onClick={() => setShowReplyInput(!showReplyInput)}
            >
                Reply
            </button>
            {showReplyInput && (
                <div className="mt-2">
                    <textarea
                        className="w-full border-2 border-gray-200 rounded-lg p-2 text-gray-700 focus:outline-none focus:border-blue-500"
                        rows="2"
                        placeholder="Write a reply..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    />
                    <button
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 text-sm rounded focus:outline-none"
                        onClick={() => {
                            onReplySubmit(comment.id, reply);
                            setShowReplyInput(false);
                            setReply('');
                        }}
                    >
                        Submit Reply
                    </button>
                </div>
            )}
        </div>
    );
};

const AdminCommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { currentUser } = useContext(AuthContext);

    const commentsRef = collection(db, 'comments');

    useEffect(() => {
        const q = query(commentsRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(commentsData);
        });
        return () => unsubscribe();
    }, []);

    const handlePostComment = async () => {
        if (newComment.trim() === '') return;

        try {
            await addDoc(commentsRef, {
                text: newComment,
                createdAt: serverTimestamp(),
                userId: currentUser.uid,
                userName: currentUser.familyName || currentUser.email,
            });

            setNewComment('');
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const handleReplySubmit = async (commentId, replyText) => {
        const commentDocRef = doc(db, 'comments', commentId);

        try {
            await runTransaction(db, async (transaction) => {
                const commentDoc = await transaction.get(commentDocRef);
                if (!commentDoc.exists()) {
                    throw "Document does not exist!";
                }

                const newReply = {
                    text: replyText,
                    // JavaScript Date object to create a timestamp
                    createdAt: new Date(),
                    replierId: currentUser.uid,
                    replierName: currentUser.familyName || currentUser.email,
                    replierImage: currentUser.profilePicture || '/default-avatar.png',
                };

                // Get the current replies and adding a new reply
                const currentReplies = commentDoc.data().replies || [];
                const newReplies = [...currentReplies, newReply];

                transaction.update(commentDocRef, { replies: newReplies });
            });
        } catch (e) {
            console.error("Transaction failed: ", e);
        }
    };




    return (
        <div className="flex flex-col space-y-4 p-6 mx-auto">
            <h2 className='text-gray-600 font-bold text-3xl'>Users Chat</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto divide-y divide-gray-200">
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onReplySubmit={handleReplySubmit}
                    />
                ))}
            </div>
            <div className="flex mt-2 space-x-8">
                <textarea
                    className="flex-1 border border-gray-200 rounded-lg p-2 text-gray-700 focus:outline-none focus:border-blue-300"
                    placeholder="Write a comment..."
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                    className="self-end bg-blue-400 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none shadow-md"
                    onClick={handlePostComment}
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export default AdminCommentsSection;
