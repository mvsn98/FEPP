import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { updateName } from '../actions/auth';

const EditProfile = (props) => {

    const [currentName, setCurrentName] = useState('')
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const onSubmit = (e)=>{
        e.preventDefault();
        if(newPassword=='' && newName!==''){
            axios.post("http://localhost:3000/users/edit", { name: newName, currentName, email: newEmail }, { headers: { Authorization: 'Bearer ' + props.token } }).then((res)=>{
                if(!res.data.error){
                    if(currentName === props.name){
                        props.updateName(newName);
                    }
                    alert('Name of this user account has been successfully updated!')
                } else {
                    alert(res.data.error);
                }
                setCurrentName("");
                setNewName("");
                setNewEmail("");
                setNewPassword("");
            })
        } else if(newName=='' && newPassword!==''){
            axios.post("http://localhost:3000/users/edit", { password: newPassword, currentName, email: newEmail }, { headers: { Authorization: 'Bearer ' + props.token } }).then((res)=>{
                if(!res.data.error){
                    alert('Password of this user account has been successfully updated!')
                } else {
                    alert(res.data.error);
                }
                setCurrentName("");
                setNewName("");
                setNewEmail("")
                setNewPassword("");
            })
        } else if(newPassword!=='' || newName!==''){
            axios.post("http://localhost:3000/users/edit", { name: newName, password: newPassword, currentName, email: newEmail }, { headers: { Authorization: 'Bearer ' + props.token } }).then((res)=>{
                if(!res.data.error){
                    if(currentName === props.name){
                        props.updateName(newName);
                    }
                    alert('Updates were successfully applied to this account!')
                } else {
                    alert(res.data.error);
                }
                setCurrentName("");
                setNewName("");
                setNewEmail("")
                setNewPassword("");
            })
        } else if(newEmail!=='' && newPassword==='' && newName===''){
            axios.post("http://localhost:3000/users/edit", { currentName, email: newEmail }, { headers: { Authorization: 'Bearer ' + props.token } }).then((res)=>{
                if(!res.data.error){
                    alert('E-mail address of this account was successfully updated!')
                } else {
                    alert(res.data.error);
                }
                setCurrentName("");
                setNewEmail("");
            })
        } else if(currentName==='' || (newPassword==='' && newName==='' && newEmail==='')){
            alert("Please Fill out the current name of user whose details you wish to update!")
        } 
    }

    const deleteAccount = (e)=>{
        e.preventDefault();
        const confirmDeletion = window.confirm('Are you sure that you want to DELETE this account?')
        if(confirmDeletion){
            axios.post("http://localhost:3000/users/delete", { currentName }, { headers: { Authorization: 'Bearer ' + props.token } }).then((res)=>{
                if(!res.data.error){
                    if(currentName === props.name){
                        window.location.assign("http://localhost:3000")
                    } else {
                        alert('This user account has been successfully deleted!')
                    }
                } else {
                    alert(res.data.error);
                }
                setCurrentName("");
                setNewName("");
                setNewPassword("");
            })
        }
    }

    return (
        <div className="content-container">
            <div className="edit-form__header">
                <h1 className="edit-form--title">Edit A Profile</h1>
            </div>
            <form className="edit-form list-item--message" onSubmit={onSubmit}>
                <input type="text" className="edit-form--input" placeholder="Current Name" onChange={ (e)=>{ e.persist(); setCurrentName(e.target.value) } } value={ currentName }/>
                <input type="text" className="edit-form--input" placeholder="New Name" onChange={ (e)=>{ e.persist(); setNewName(e.target.value) } } value={ newName }/>
                <input type="email" className="edit-form--input" placeholder="New E-mail Address" onChange={ (e)=>{ e.persist(); setNewEmail(e.target.value) } } value={ newEmail } />
                <input type="password" className="edit-form--input" placeholder="New Password" onChange={ (e)=>{ e.persist(); setNewPassword(e.target.value) } } value={ newPassword }/>
                <div className="button-container">
                <button className="edit-form--button">Submit</button>
                <button className="edit-form--button" onClick={deleteAccount} style={{justifySelf: 'left'}} >Delete Account</button>
                </div>
            </form>
        </div>
    )

}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    name: state.auth.name
})

const mapDispatchToProps = (dispatch) => ({
    updateName: (name) => dispatch(updateName({name}))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);