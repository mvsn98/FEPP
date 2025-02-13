import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import socketIOClient from 'socket.io-client';
import { v4 } from 'uuid';
import { connect } from 'react-redux';


import Feedback from './Feedback';
import { setFeedbacks } from '../actions/feedback';

import { setSearchTerm } from '../actions/filters';
import searchFeedbacks from '../selectors/feedback';

const HomePage = (props) => {
  const PER_PAGE = 3;

  const socketIOEndpoint = "http://localhost:3000";

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [pending, setPending] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [addFeedback, setAddFeedback] = useState({});

  useEffect(()=>{
    axios.post("http://localhost:3000/users/getfeedback",{dummy: ''}, { headers: { Authorization: 'Bearer ' + props.token } }).then((res)=>{
        props.setFeedbacks(res.data.feedbacks.reverse());
    })
  }, [addFeedback]);

  useEffect(()=> {
    const strAuth = JSON.stringify(props.auth);
    localStorage.setItem('auth', strAuth);
    const socket = socketIOClient(socketIOEndpoint);
    socket.emit("join", true);
    socket.on("refresh", () => {
      setAddFeedback({ hash: v4() });
    });
  }, []);

  const handleDeleteFeedback = (message)=>{
    axios.post("http://localhost:3000/users/deletefeedback",{ message }, { headers: { Authorization: 'Bearer ' + props.token } }).then(()=>{
      setAddFeedback({ hash: v4() });
    })
  }

  const handleReply = ({email, replyObj})=>{
    axios.post("http://localhost:3000/users/reply",{ replyDetails: {email, replyObj} }, { headers: { Authorization: 'Bearer ' + props.token } }).then((res)=>{
      if(!res.data.error){
        alert('The reply was successfully e-mailed to this user!')
        setAddFeedback({ hash: v4() });
      } else {
        alert(res.data.error);
      }
    })  
  }

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  let feedbacks;

  if(props.selected.length===0){
    if(searchTerm===''){
      feedbacks = props.feedbacks;
    } else {
      feedbacks = [];
    }
    
  } else {
    feedbacks = props.selected;
  }

  if(pending) {
    feedbacks = feedbacks.filter((feedback) => feedback.answered === false);
  } 

  if(answered) {
    feedbacks = feedbacks.filter((feedback) => feedback.answered === true);
  }

  const currentPageData = feedbacks
    .slice(offset, offset + PER_PAGE)
    .map((feedback) => {
      return <Feedback key={feedback._id} {...feedback} handleDeleteFeedback={handleDeleteFeedback} handleReply={handleReply}/>;
    })

  const pageCount = Math.ceil(feedbacks.length / PER_PAGE);

  return (
    <div className="content-container">
      <h3 style={{marginTop: "15px", marginBottom: "5px", justifyContent: 'center'}}>Welcome, {props.name} !</h3>
      <div className="list-header">
        <div>Feedback Messages</div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '10px'}}>
          <div style={{alignSelf: 'center'}}>
          <input type='checkbox' onChange={(e) => { e.persist(); setPending(!pending); setCurrentPage(0);}} value={pending} disabled={answered}></input><label>Show Pending</label>
          </div>
          <div style={{alignSelf: 'center'}}>
          <input type='checkbox' onChange={(e) => { e.persist(); setAnswered(!answered); setCurrentPage(0); }} value={answered} disabled={pending}></input><label>Show Answered</label>
          </div>
          <input type="search" placeholder="Search by name..." onChange={(e)=> {e.persist(); props.setSearchTerm(e.target.value); setSearchTerm(e.target.value); setCurrentPage(0);}} value={searchTerm}></input>
        </div>
      </div>
      <div className="list-body">
        {
          feedbacks.length === 0 ? (
            <div className="list-item list-item--message">
              <span>No Messages</span>
            </div>
          ) : (
              <div>
                {currentPageData}
              </div>
            )
        }
      </div>
      <div style={{marginTop: "25px", marginBottom: "25px", justifyContent: "flex-end"}}>
        {
            feedbacks.length === 0 ? (
              <div>
              </div>
            ) : (
                  <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                  forcePage={currentPage}
                />
              )
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    feedbacks: state.feedback,
    selected: searchFeedbacks(state.feedback, state.search),
    token: state.auth.token,
    name: state.auth.name,
    searchTerm: state.search.name,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => ({
  setFeedbacks: (feedbacks) => dispatch(setFeedbacks(feedbacks)),
  setSearchTerm: (name) => dispatch(setSearchTerm(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
