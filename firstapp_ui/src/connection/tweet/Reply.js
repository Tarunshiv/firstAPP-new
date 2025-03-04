import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reply.css";
import ReplyBox from "./ReplyBox";

function Reply({ tweetId, showReplies }) {
  const [replies, setReplies] = useState([]);
  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const [Refresh, setRefresh] = useState(true)
  const apiDomain = process.env.REACT_APP_DJANGO_DOMAIN_NAME;

  const toggleRefresh = (tweetId) => {
    setRefresh(!Refresh)
  };

  const fetchReplies = async () => {
    try {
      let apiUrl = `${apiDomain}/connection/reply/${tweetId}/`;

      console.log(apiUrl)
      console.log(authTokens.access)
      const response = await axios.get(apiUrl,{
        'headers': { 
          'Content-Type':'application/json',
          'Authorization': 'JWT ' +String(authTokens.access) 
        }
      });
      setReplies(response.data);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  useEffect(() => {
    console.log('fetchReplies')
    fetchReplies();
  }, [Refresh]);

  return (
    <div className="tweet-replies">
    {showReplies && (
      <span>
        <h2 className="replies-heading">Replies:</h2>
        <ReplyBox tweetId={tweetId } toggleRefresh={toggleRefresh}/>
        <ul className="replies-list">
          {replies.map((reply) => (
            <li key={reply.id} className="reply-item">
              <p className="reply-content">
                <span className="reply-author">@{reply.username} </span> 
                <span className="reply-date">{reply.created_at} </span><br/>
                <span className="reply-text">{reply.reply} </span>
              </p>
            </li>
          ))}
        </ul>
      </span>
    )}
    </div>
  );
}

export default Reply;
