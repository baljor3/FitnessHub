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

   

    const checkUserName =(username) =>{
        
        let newword = usernameError
        
        if(hasWhiteSpace(username) || username !== undefined){
            if(!newword.includes('spaces')){
                newword += " spaces,"
            }
        }else{
            newword =  newword.replace(/spaces[,.]/, '')
        }

        if(username.length <=4 ){
            if(!newword.includes("less than 3 characters")){
                newword += " and less than 3 characters,"
            }
        }else{
            newword = newword.replace(" ?:[and]? less than 3 characters", "") 
        }
      
        
    if(newword.includes('less than 3 characters') || newword.includes(" spaces")){
       
        newword = newword.substring(0,newword.length-1) + '.'    

        if(!newword.includes('spaces')){
            newword = newword.replace(/and/, '')
        }

        let lastCommaIndex = newword.lastIndexOf(',');

        // If a comma is found
            if (lastCommaIndex !== -1) {
        // Add "and" after the last comma
            newword = newword.substring(0, lastCommaIndex + 1) + " and" + newword.substring(lastCommaIndex + 1);
            }

        usernameError(newword)
        setUserNameErrorState(true)
    }else{
        setUserNameErrorState(false)
    }
}
   

    const checkPassword = async(password) =>{
        let newword = passError
        
        if(hasWhiteSpace(password) || password != undefined){
            if(!newword.includes('spaces')){
                newword += " spaces,"
            }
        }else{
            newword =  newword.replace(/spaces[,.]/, '')
        }

        if(password.length <=4 ){
            if(!newword.includes("less than 3 characters")){
                newword += " and less than 3 characters,"
            }
        }else{
            newword = newword.replace(/ ?(?:and)? less than 3 characters[.,]?/, "")
        }
      
        
    if(newword.includes('less than 3 characters') || newword.includes(" spaces")){
       
       
        newword = newword.substring(0,newword.length-1) + '.'    

        if(!newword.includes('spaces')){
            newword = newword.replace(/and/, '')
        }

        let lastCommaIndex = newword.lastIndexOf(',');

        // If a comma is found
        if (lastCommaIndex !== -1) {
        // Add "and" after the last comma
        newword = newword.substring(0, lastCommaIndex + 1) + " and" + newword.substring(lastCommaIndex + 1);
        }

        setPassError(newword)
        setPassErrorState(true)
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
    checkUserName(username)
    await checkPassword(password)
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