import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import './Login.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () =>{
  const [showpassword, setShowPassword] = useState(false)

  const changePassword =() =>{
    setShowPassword(prev =>!prev)
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
    <Form style= {{width: "525px", height:"453px", border:"3px solid #FCE5BD", boxShadow: "10px 10px 10px rgba(0.1, 0.1, 0.1, 0.1)"}} >
      <Form.Label className="d-flex justify-content-center mb-4" style= {{fontSize: "48px"}}> Login</Form.Label>
        <Form.Group>
            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginBottom:"10px"}}> Username </Form.Label>
            <Form.Control type="text" style={{width:"455px", height:"55px",marginLeft:"30px" }}/>
        </Form.Group>
        <Form.Group>
            <Form.Label style={{fontSize:"28px", marginLeft:"30px", marginTop:"20px",marginBottom:"10px"}}> Password </Form.Label>
            <div className='d-flex'>
            <Form.Control style={{width:"455px", height:"55px",marginLeft:"30px" }}
            type={showpassword? "text":"password"}/> 
            <span onClick={changePassword} className="password-icon">{showpassword ? "👁️" : "🔒" }</span>
            </div>
        </Form.Group>
        <div className='d-flex justify-content-center align-items-center' style={{marginTop:"5px"}}>
        <Button style={{width:"200px"}}>Login</Button>
        </div>
        <div className='d-flex justify-content-center align-items-center' style={{marginTop:"5px"}}>
        <Link to= '/register'><Button style= {{width:"120px"}} >Register</Button></Link>
        </div>
    </Form>
    </Container>
    </div>
)


}

export default Login;