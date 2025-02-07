import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e)=>{
        e.preventDefault();
        if(email=='' || name=='' || password==''){
            alert('Please fill out the entire form to create a new account!')
        } else if(password.length < 7 ){
            alert('Please Enter a Password that is at least 7 characters long!')
        } else if(password.toLowerCase().includes('password')){
            alert('The password string cannot contain the word \"password\"');
        } else {
            axios.post("http://localhost:3000/users/register", { email, name, password }).then((res)=>{
                if(!res.data.error){
                    alert('The new account has been successfully created!')
                } else {
                    alert(res.data.error);
                }
                setName("");
                setPassword("");
                setEmail("");
            })
        }
    }

    return (
        <div className="content-container">
            <div className="edit-form__header">
                <h1 className="edit-form--title">Create A New Account</h1>
            </div>
            <form className="edit-form list-item--message" onSubmit={onSubmit}>
                <input type="text" className="edit-form--input" placeholder="Account Name" value={name} onChange={ (e)=>{e.persist(); setName(e.target.value)} }/>
                <input type="email" className="edit-form--input" placeholder="E-mail Address" value={email} onChange={ (e)=>{e.persist(); setEmail(e.target.value)} }/>
                <input type="password" className="edit-form--input" placeholder="Password" value={password} onChange={ (e)=>{e.persist(); setPassword(e.target.value)} }/>
                <button className="edit-form--button">Submit</button>
            </form>
        </div>
    )

}

export default CreateAccount;