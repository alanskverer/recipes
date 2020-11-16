import React, { useState, useEffect } from 'react';
import Background from './Pictures/FoodOne.jpg'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../App.css';
import axios from './axsios-orders';
import Modal from '../Components/UI/Modal/Modal';

import $ from 'jquery';


function HomePage() {
  var sectionStyle = {
    width: "100%",
    height: "800px",
    backgroundImage: "url(" + Background + ")",
    position: "absolute",
    top: 0,
    left: 0,
    minWidth: "100%",
    minHeight: "100%",
  };


  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [cantConnect, setCantConnect] = useState(false);
  const [registered, setregistered] = useState(false);
  useEffect(() => {




    $("#userNameTaken").hide()
    axios.get('https://alanrecipes1313.firebaseio.com/users.json')
      .then(response => {
        // console.log(response.data)
        let usersArr = response.data;






        let objKeys = Object.keys(response.data);
        let dataArr = [];
        objKeys.forEach(key => {
          let value = response.data[key];
          dataArr.push(value);

          let currentUser = {
            userName: value.userName,
            password: value.password
          }
          // let usersArr = [...usersList];
          // arrKeyAndName.push(currentKeyAndName);
          // this.setState({ recipesKeyAndName: arrKeyAndName })


        });
        setUsersList(dataArr);












      })
    // axios.post('/users.json');
    // let user = {
    //   userName: "alan",
    //   password: "123456"
    // }

    // axios.post('/users.json', user)















  }, [login, registered]);



  const userNameHandler = (event) => {
    setUserName(event.target.value)
  }
  const passwordHandler = (event) => {
    setUserPassword(event.target.value)

  }
  const loginHandler = () => {
    const foundUserName = usersList.find(user => user.userName === userName);

    if (foundUserName !== undefined) {
      // console.log(foundUserName)
      if (foundUserName.password === userPassword) {
        setLogin(true);
        setLoginModal(true);

      }
      else {
        setCantConnect(true)// what happen when user dosent match to db?
      }

    } else {
      setCantConnect(true)// what happen when user dosent match to db?

    }
  }
  const closeModalHandler = () => {
    setLoginModal(false);
    setCantConnect(false);
  }
  const registerHandler = () => {








    const foundUserName = usersList.find(user => user.userName === userName);

    if (foundUserName !== undefined) { $("#userNameTaken").show() }
    else {

      let user = {
        userName: userName,
        password: userPassword
      }

      axios.post('/users.json', user)
        .then(() => {
          setregistered(true);
          setLoginModal(true);


        })
    }







  }

  let loginPage = <Col sm="12">
    <section style={sectionStyle}>
      <Form style={{
        marginLeft: "13%", width: "50%", marginTop: "30px"
      }}>


        <Form.Group controlId="formBasicEmail">
          <Form.Label style={{ color: "white" }}>User Name:</Form.Label>
          <Form.Control onChange={userNameHandler} className="login-bar" type="text" placeholder="Enter User Name" />

        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label style={{ color: "white" }}>Password</Form.Label>
          <Form.Control onChange={passwordHandler} className="login-bar" type="password" placeholder="Password" />
        </Form.Group>

        <Button onClick={loginHandler} variant="primary" >
          Login
        </Button>
        <Button onClick={registerHandler} style={{ marginLeft: "25px" }} variant="primary" >
          Register
        </Button>
        <h5 id="userNameTaken" style={{
          color: "red",
          margin: "auto 0"
        }}>{userName} is taken!, try different user name</h5>
      </Form>

    </section>

  </Col>






  return (

    <Container fluid>
      <Row>
        <Modal show={loginModal} >
          <div>
            <p style={{ marginTop: "0px", textAlign: "center" }}>{`Hey ${userName}, Welcome!`}</p>
            <p style={{ marginTop: "0px", textAlign: "center" }}>Where Do You Want To Go?</p>
            <div className="col-md-12 text-center">
              <Button href="http://localhost:3000/myrecipes" variant="link">My Recipes</Button>
              <Button href="http://localhost:3000/onlinerecipes" variant="link">Online Recipes</Button><br />
              <Button onClick={closeModalHandler} variant="secondary" style={{ marginTop: '25px' }}>Close</Button>
            </div>
          </div>

        </Modal>


        <Modal show={cantConnect} >
          <div>
            <p style={{ marginTop: "0px", textAlign: "center" }}>Wrong username or password, please try again</p>
            <div className="col-md-12 text-center">
              <Button onClick={closeModalHandler} variant="secondary" style={{ marginTop: '25px' }}>Close</Button>
            </div>
          </div>

        </Modal>
        {loginPage}
      </Row>
    </Container>




  )
}

export default HomePage
