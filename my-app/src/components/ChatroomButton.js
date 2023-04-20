import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import React from "react";

const ChatroomButton = () => {
    console.log("form fill")
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Link to="/chat">
                <button>
                    Chatroom
                </button>
            </Link>
        )
    );
};

export default ChatroomButton;