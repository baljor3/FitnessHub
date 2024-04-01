import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import './Login.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () =>{
  const [showpassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')
  const [username, setUserName] = useState('')
  const [usernameErrorState, setUserNameErrorState] = useState(false)
  const [usernameError, setuserNameError]= useState('username can not have')
  const [email,setEmail] = useState('')

  const changePassword =() =>{
    setShowPassword(prev =>!prev)
  }

  
  function hasWhiteSpace(str) {
        for (let i = 0; i < str.length; i++) {
          if (str[i] === ' ' || str[i] === '\t' || str[i] === '\n' || str[i] === '\r') {
            return true; // Found a white space character
        }
    }
    return false; // No white space character found
}

    const checkUserName = (username) =>{
       

        if(!hasWhiteSpace(username)){
            
            setuserNameError(prevErrorMessage => prevErrorMessage + " spaces");
            setUserNameErrorState(true)
        }

    }

 const checkEmail = (email) => {
    var bool = false;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    bool = hasWhiteSpace(email)
    if(bool === true){
    //    setErrorPass("there is whitespace in your email")
        return bool = true;
    }

    if (!emailRegex.test(email)) {
   //     setErrorEmail("Incorrect Email format")
        return bool = true;
    }else{
   //     setErrorEmail("")
    }

}

 const submitReg = (e) =>{
    e.preventDefault();
    checkUserName(username)
 }

    
return(<div>
    <Container fluid className="d-flex justify-content-center align-items-center no-margin" style={{ backgroundColor: '#FCE5BD' }}>
    <Row >
      <Col style= {{fontSize:'64px'}} >
        Fitness Hub
      </Col>
    </Row>
    </Container>
    <Container className='form-container'>

    <Form style= {{width: "525px", height:"700px", border:"3px solid #FCE5BD", boxShadow: "10px 10px 10px rgba(0.1, 0.1, 0.1, 0.1)"}} onSubmit={submitReg} >

      <Form.Label className="d-flex justify-content-center mb-4" style= {{fontSize: "48px"}}> Registration</Form.Label>

        <Form.Group>

            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginBottom:"10px"}}> Username </Form.Label>
            <Form.Control type="text" style={{width:"455px", height:"55px",marginLeft:"30px" }} onChange={(e)=>{setUserName(e.target.value)}}/>
            {usernameErrorState ? usernameError : null}
            

        </Form.Group>

        <Form.Group>
            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginTop:"20px",marginBottom:"10px"}}> Password </Form.Label>

            <div className='d-flex'>
                <Form.Control style={{width:"455px", height:"55px",marginLeft:"30px" }}
                 type={showpassword? "text":"password"} onChange={(e)=>{setPassword(e.target.value)}}/> 

                <span onClick={changePassword} className="password-icon">{showpassword ? "👁️" : "🔒" }</span>
            </div>

        </Form.Group>

        <Form.Group>

            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginTop:"20px",marginBottom:"10px"}}> Confirm Password </Form.Label>

            <div className='d-flex'>

                <Form.Control style={{width:"455px", height:"55px",marginLeft:"30px" }}
                 type={showpassword? "text":"password"} onChange={(e)=>{setConfirmPassword(e.target.value)}}/> 

                <span onClick={changePassword} className="password-icon">{showpassword ? "👁️" : "🔒" }</span>
            </div>

        </Form.Group>

        <Form.Group>

            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginTop:"20px",marginBottom:"10px"}}> Email </Form.Label>
            <Form.Control style={{width:"455px", height:"55px",marginLeft:"30px" }} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>  

        </Form.Group>

        <div className='d-flex justify-content-center align-items-center' style={{marginTop:"5px"}}>

            <Button style={{width:"200px"}} type = 'submit'>Register</Button>
            
        </div>

        <div className='d-flex justify-content-center align-items-center' style={{marginTop:"5px"}}>

            <Link to = "/"><Button style= {{width:"120px"}}>Sign In</Button></Link>
       
       </div>
    </Form>
    </Container>
    </div>
)


}

export default Login;