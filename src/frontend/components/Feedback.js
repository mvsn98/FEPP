import React, { useState } from 'react';
import ReplyModal from './ReplyModal';

const Feedback = ({ message, name, email, answered, handleReply, handleDeleteFeedback }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNormalExit = ()=>{
    setIsOpen(false);
  }

  const handleReplyMessage = (replyObj)=>{
    setIsOpen(false);
    handleReply({email, replyObj});
  }

  return (
  <div>
    <div className={"list-item " + (answered ? 'answered' : 'not-answered')}>
      <h3 className="list-item__title">“{message}”</h3>
      <div className="list-item__footer">
        <h3 className="list-item__sub-title">{name}</h3>
        <div className="list-item__actions">
          <h3 className="list-item__sub-title list-item--reply clickable" onClick={ ()=>{ setIsOpen(true); } }>Reply</h3> 
          <h3 className="list-item__sub-title clickable" onClick={ ()=>{ handleDeleteFeedback(message) }}>Remove</h3>
        </div> 
      </div>
    </div>
    <ReplyModal name={name} isOpen={isOpen} handleNormalExit={handleNormalExit} handleReplyMessage={handleReplyMessage}/>
  </div>
  );
}

export default Feedback;
