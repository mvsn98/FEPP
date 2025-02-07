import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

import { history } from '../routers/AppRouter'
import { login } from '../actions/auth';

const LoginPage = (props)=>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const onsubmit = (e)=>{
        e.persist();
        e.preventDefault();
        if(name!=='' && password!==''){
            axios.post("http://localhost:3000/users/auth", {name, password}).then((res)=>{
                if(res.data.token){
                    props.login({name: res.data.user.name, jwt: res.data.token});
                    history.push('/home');
                } else {
                    alert("Invalid Username or Password.")
                    setName("");
                    setPassword("");
                }
            })
        } else {
            alert("Please Enter your Name and Password before submitting the form!")
            setName("");
            setPassword("");
        }
    }

    const onFPClick = ()=>{
        axios.post("http://localhost:3000/users/forgotpassword", { name }).then((res)=>{
            if(!res.data.error){
                alert('Please check your e-mail for your new password!')
            } else {
                alert(res.data.error);
            }
            setName("");
            setPassword("");
        })
    }

    const onCancelClick = ()=>{
        const confirmation = window.confirm("You will be re-directed to the main profile page...")
        if(confirmation){
            window.location.assign("http://localhost:3000")
        }
    }

    return (
        <div className="box-layout">
            <form style={{width: '30%', margin: "0 auto", backgroundColor: "rgb(162, 0, 255)", borderRadius: "4%"}} onSubmit={onsubmit} id="LoginForm">
                <div className="imgcontainer">
                    <h1>Admin Control Panel</h1>
                </div>

                <div className="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" id='uname' name="uname" onChange={(e)=>{e.persist(); setName(e.target.value)}} value={name}/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" id='psw' placeholder="Enter Password" name="psw" onChange={(e)=>{e.persist(); setPassword(e.target.value)}} value={password}/>
                        
                    <button type="submit" style={{width: "30%", display:"block", marginLeft: "auto", marginRight: "auto", margin: "15px auto"}}>Login</button>
                </div>

                <div className="container" style={{borderTop: "1px solid black", backgroundColor: "rgb(184, 148, 241)"}}>
                    <button type="button" className="cancelbtn" onClick={onCancelClick}>Cancel</button>
                    <span className="psw"><a id="fpsw" href="#" onClick={onFPClick}>Forgot Password?</a></span>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>({
    login: (userObj) => dispatch(login(userObj))
})

export default connect(undefined, mapDispatchToProps)(LoginPage);