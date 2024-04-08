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
  const [passErrorState, setPassErrorState] = useState(false)
  const [passError, setPassError]= useState('password can not have')
  const [passErrorSpace, setPassErrorSpace] = useState(false)
  const [passLength, setPassLength]= useState(false)
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

    const checkUserNameWhiteSpaces = (username) =>{
        
        if(hasWhiteSpace(username)){
            setUserNameErrorState(true)
            if(!usernameError.includes('spaces')){
                return
            }
            setuserNameError(prevErrorMessage => prevErrorMessage + " spaces,");
        }else{
            if(usernameError.includes('spaces')){
                let newword = usernameError
                newword.replace(" spaces[, .]","")
                setuserNameError(newword)
            }
            setUserNameErrorState(false)
        }
      
    }

    const checkUserNameLength = (username) =>{
        
        if(username.length <=4 ){
            setUserNameErrorState(true)
            if(!username.includes('username must be longer than 3 characters')){
                return
            }
            setuserNameError(prevErrorMessage => prevErrorMessage + " and username must be longer than 3 characters.");
        }else{
            if(usernameError.includes('username must be longer than 3 characters')){
                let newword = usernameError
                newword.replace(" ?:[and]? username must be longer than 3 characters","")
                setuserNameError(newword)
            }
            setUserNameErrorState(false)
        }
      
    }

    const checkUserName =(username) =>{
        

    if(usernameError.includes('username must be longer than 3 characters') || usernameError.includes('spaces')){
        let newword= usernameError;
        
        if(newword[newword.length-1] === ','){
            newword = newword.substring(0,newword.length-1) + '.'
            setuserNameError(newword)

        }

        if(!username.includes('spaces')){
            newword.replace(' and', '')
            setuserNameError(newword)
        }

     }
     
    }

    const checkPasswordWhiteSpaces = (password) =>{
        if(hasWhiteSpace(password)){
            setPassErrorSpace(true)
            if(!passError.includes('spaces')){
                setPassError(prevErrorMessage => prevErrorMessage + " spaces,");
            }
        }else{
            setPassError(prevErrorMessage => prevErrorMessage.replace('spaces[, .]', ''));
            setPassErrorSpace(false)
        }
        
    }

    // TODO: make setPassError update in time
const prom = (newState) =>{new Promise(resolve => this.setState(newState, resolve));}



    const checkPasswordLength = (password) =>{
        console.log(passError)
        if(password.length <=4 ){
            setPassLength(true)
            if(!passError.includes("less than 3 characters")){
                setPassError(prevErrorMessage => prevErrorMessage + " and less than 3 characters.", () =>{
                    console.log(passError)
                });
        };
        }else{
            setPassError(prevErrorMessage => prevErrorMessage.replace(' ?:[and]? less than 3 characters', ''));
            setPassLength(false)
        }
       
    }

    const checkPassword =(password) =>{
       
    if(passLength || passErrorSpace){
        let newword= passError;
        setPassErrorState(true)
        if(newword[newword.length-1] === ','){
            newword = newword.substring(0,newword.length-1) + '.'
            setPassError(newword)
        }

        if(!password.includes('spaces')){
            newword.replace(' and', '')
            setPassError(newword)
        }

    }else{
        setPassErrorState(false)
    }
   
    }


 const checkEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

 
    if(hasWhiteSpace(email)){
        
    }

    if (!emailRegex.test(email)) {
   //     setErrorEmail("Incorrect Email format")
        return
    }else{
   //     setErrorEmail("")
    }

}

 const submitReg =  async (e) =>{
    e.preventDefault();
    checkUserNameWhiteSpaces(username)
    checkUserNameLength(username)
    checkUserName(username)
    checkPasswordLength(password)
    checkPasswordWhiteSpaces(password)
    checkPassword(password)
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
            {passErrorState ? passError : null}
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