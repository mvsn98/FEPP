import React, { useState } from 'react';
import Modal from 'react-modal';

const ReplyModal = (props) => {
    const [reply, setReply] = useState('');
    const [title, setTitle] = useState('');
    return (
    <Modal
        isOpen={props.isOpen}
        onRequestClose={()=>{setReply(''); setTitle(''); props.handleNormalExit();}}
        contentLabel="Write a Reply..." 
        closeTimeoutMS={200}
        className="modal"
    >

        <h3 className="modal__title">Replying To: {props.name}</h3>
        <input type="text" style={{display: 'block', marginBottom: "10px", padding: "10px", backgroundColor: "#ccc", width: "100%"}} placeholder="Title of Reply..." className="reply--input" value={title} onChange={(e)=>{e.persist(); setTitle(e.target.value)}}></input>

        <textarea value={reply} onChange={(e)=>{e.persist(); setReply(e.target.value)}} cols="50" rows="10" style={{resize: 'none', display: 'block', marginBottom: "10px", padding: "10px", backgroundColor: "#ccc"}} className="reply--input" placeholder="Write your reply here..."></textarea>

        <div className="modal__controls">
            <button className="button button--link button--modal" onClick={()=>{if(reply!==''){props.handleReplyMessage({title, reply}); setReply(''); setTitle('')} else {alert('You must enter a NON-EMPTY reply to send an E-Mail to this person!')}}}>Send Reply</button>
            
            <button className="button button--link button--modal" onClick={()=>{setReply(''); setTitle(''); props.handleNormalExit()}}>Cancel</button>
        </div>

    </Modal>
    );
}

export default ReplyModal;