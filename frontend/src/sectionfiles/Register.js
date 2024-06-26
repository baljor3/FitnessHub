import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import './Login.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {CREATE_USER} from '../Graphql/Mutations/mutation'
import { useMutation } from '@apollo/client';
import { ErrorLink, onError } from "@apollo/client/link/error";


// Log any GraphQL errors or network error that occurred


const Register = () =>{
  const [showpassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')
  const [confirmpasswordError, setConfirmPasswordError] = useState(false)
  const [username, setUserName] = useState('')
  const [usernameErrorState, setUserNameErrorState] = useState(false)
  const [usernameError, setuserNameError]= useState('username can not have')
  const [passErrorState, setPassErrorState] = useState(false)
  const [passError, setPassError]= useState('password can not have')
  const [emailError,setEmailError]= useState('Email is invalid')
  const [emailState,setEmailState] = useState(false)
  const [generalError, setGeneralError] = useState('');
  const [generalErrorState, setGeneralErrorState] = useState(false)

  const [createUser, {data, loading, createError}] = useMutation(CREATE_USER)
  const navigate = useNavigate();
  
 const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
  const [email,setEmail] = useState('')

  const changePassword =() =>{
    setShowPassword(prev =>!prev)
  }

  
  function hasWhiteSpace(str) {
    if(str.length <=0){
        return
    }
        for (let i = 0; i < str.length; i++) {
          if (str[i] === ' ' || str[i] === '\t' || str[i] === '\n' || str[i] === '\r') {
            return true; // Found a white space character
        }
    }
    return false; // No white space character found
}

   
const checkUserName = (username) => {
    return new Promise((resolve, reject) => {
      let newword = usernameError;

      if (hasWhiteSpace(username)) {
        if (!newword.includes('spaces')) {
          newword += " spaces,";
        }
      } else {
        newword = newword.replace(/spaces[,.]/, '');
      }

      if (username.length < 4) {
        if (!newword.includes("less than 3 characters")) {
          newword += " and less than 3 characters,";
        }
      } else {
        newword = newword.replace(" ?:[and]? less than 3 characters", "");
        newword = newword.replace("less than 3 characters", "");
      }

      if (newword.includes('less than 3 characters') || newword.includes(" spaces")) {
        newword = newword.substring(0, newword.length - 1) + '.';

        if (!newword.includes('spaces')) {
          newword = newword.replace(/and/, '');
        }

        let firstperiodIndex = newword.indexOf('.');

        // If a comma is found
        if (firstperiodIndex !== -1 && (newword.length - 1) !== firstperiodIndex) {
          // Add "and" after the last comma
          newword = newword.substring(0, firstperiodIndex) + "," + " and" + newword.substring(firstperiodIndex + 1);
        }

        setuserNameError(newword);
        setUserNameErrorState(true);
        resolve();
      } else {
        setUserNameErrorState(false);
        resolve();
      }
    });
  }

  const checkPassword = (password) => {
    return new Promise((resolve, reject) => {
      let newword = passError;

      if (hasWhiteSpace(password)) {
        if (!newword.includes('spaces')) {
          newword += " spaces,";
        }
      } else {
        newword = newword.replace(/spaces[,.]/, '');
      }

      if (password.length <= 4) {
        if (!newword.includes('less than 3 character')) {
          newword += " and less than 3 characters,";
        }
      } else {
        newword = newword.replace(/ ?(?:and)? less than 3 characters[.,]?/, "");
      }

      if (newword.includes('less than 3 characters') || newword.includes(" spaces")) {
        newword = newword.substring(0, newword.length - 1) + '.';

        if (!newword.includes('spaces')) {
          newword = newword.replace(/and/, '');
        }

        let firstperiodIndex = newword.indexOf('.');

        // If a comma is found
        if (firstperiodIndex !== -1 && (newword.length - 1) !== firstperiodIndex) {
          // Add "and" after the last comma
          newword = newword.substring(0, firstperiodIndex) + "," + " and" + newword.substring(firstperiodIndex + 1);
        }

        setPassError(newword);
        setPassErrorState(true);
        resolve();
      } else {
        setPassErrorState(false);
        resolve();
      }
    });
  }

  const matchPassword = (password, confirmpassword) => {
    return new Promise((resolve, reject) => {
      if (password !== confirmpassword) {
        setConfirmPasswordError(true);
        resolve();
      } else {
        setConfirmPasswordError(false);
        resolve();
      }
    });
  }

  const checkEmail = (email) => {
    return new Promise((resolve, reject) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (hasWhiteSpace(email) || !emailRegex.test(email)) {
        setEmailState(true);
        resolve();
      } else {
        setEmailState(false);
        resolve();
      }
    });
  }

const Reg = async() =>{
    if(emailState === false && usernameErrorState === false && passErrorState === false && confirmpasswordError === false){
        console.log('emailError', emailState, 'usernameError ', usernameErrorState, 'password error ',passErrorState, 'confirmed pass error ', confirmpasswordError )
        try {
             await createUser({
              variables: {
                username: username,
                password: password,
                email: email
              }
            });    
            navigate("/")
          } catch (err) {
            console.error('Error creating user:', err);
            if (err.message.includes('duplicate key value violates unique constraint "polls_customuser_email_key"')) {
              setGeneralError('Email already exists. Please use a different email.');
              setGeneralErrorState(true)
            } else {
              setGeneralError('An error occurred. Please try again.');
              setGeneralErrorState(true)
            }
            
          }
       
        
    }else{
        console.log("not accepting parameters")
        return
    }
}

 const submitReg = async (e) =>{
    e.preventDefault();
    await checkUserName(username)
    await checkPassword(password)
    await matchPassword(password, confirmpassword)
    await checkEmail(email)
    Reg()
    
 }

    
return(<div>
    <Container fluid className="d-flex justify-content-center align-items-center no-margin" style={{ backgroundColor: '#FCE5BD' }}>
    <Row >
      <Col style= {{fontSize:'64px'}} >
        Fitness Hub
      </Col>
    </Row>
    </Container>
    <Container className={`form-container`}>

    <Form className={`${usernameErrorState ? 'error-size': 'form-size'}`} onSubmit={submitReg} >

      <Form.Label className="d-flex justify-content-center mb-4" style= {{fontSize: "48px"}}> Registration</Form.Label>

        <Form.Group>

            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginBottom:"10px"}}> Username </Form.Label>
            <Form.Control type="text" style={{width:"455px", height:"55px",marginLeft:"30px" }} onChange={(e)=>{setUserName(e.target.value)}}/>
            {usernameErrorState ? <p style={{margin: 0, padding: 0, color:"red", textAlign:"center"}}>{usernameError}</p> : null}
            

        </Form.Group>

        <Form.Group>
            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginTop:"20px",marginBottom:"10px"}}> Password </Form.Label>

            <div className='d-flex'>
                <Form.Control style={{width:"455px", height:"55px",marginLeft:"30px" }}
                 type={showpassword? "text":"password"} onChange={(e)=>{setPassword(e.target.value)}}/> 

                <span onClick={changePassword} className="password-icon">{showpassword ? "👁️" : "🔒" }</span>
            </div>
            {passErrorState ? <p style={{margin: 0, padding: 0, color:"red", textAlign:"center"}}>{passError}</p> : null}
        </Form.Group>

        <Form.Group>

            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginTop:"20px",marginBottom:"10px"}}> Confirm Password </Form.Label>

            <div className='d-flex'>

                <Form.Control style={{width:"455px", height:"55px",marginLeft:"30px" }}
                 type={showpassword? "text":"password"} onChange={(e)=>{setConfirmPassword(e.target.value)}}/> 

                <span onClick={changePassword} className="password-icon">{showpassword ? "👁️" : "🔒" }</span>
            </div>
            {confirmpasswordError ? <p style={{margin: 0, padding: 0, color:"red", textAlign:"center"}}>password is not the same</p>: null}
        </Form.Group>

        <Form.Group>

            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginTop:"20px",marginBottom:"10px"}}> Email </Form.Label>
            <Form.Control style={{width:"455px", height:"55px",marginLeft:"30px" }} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>  
            {emailState ? <p style={{margin: 0, padding: 0, color:"red", textAlign:"center"}}>{emailError}</p>: null}
        </Form.Group>

        <div className='d-flex justify-content-center align-items-center' style={{marginTop:"5px"}}>

            <Button style={{width:"200px"}} type = 'submit'>Register</Button>
            
        </div>

        {generalErrorState ? generalError : null}

        <div className='d-flex justify-content-center align-items-center' style={{marginTop:"5px"}}>

            <Link to = "/"><Button style= {{width:"120px"}}>Sign In</Button></Link>
       
       </div>
    </Form>
    </Container>
    </div>
)


}

export default Register;