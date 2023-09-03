import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


function Logout() {
  
  const [authTokens, setauthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : {"refresh": null, "access": null})
  const navigate = useNavigate();

  const handleLogout = async() => {
    console.log('logout',authTokens.access)
      try  {
        const response = await axios.post('http://127.0.0.1:8000/user/logout/', 
          {
            'refresh_token': authTokens.refresh 
          },
          {
            'headers': { 
              'Content-Type':'application/json',
              'Authorization': 'JWT ' +String(authTokens.access) 
            }
          }
        );
        localStorage.getItem('authTokens') ? localStorage.removeItem('authTokens') : console.log('No User to logout')
        localStorage.getItem('userData') ? localStorage.removeItem('userData') : console.log('No User data to logout')
        navigate('/login/')
      } 
      catch (error){
        console.error('Error in logging out:', error);
      }

    };
  return (
  <div>
    <button onClick={handleLogout}>Logout</button>
  </div>
  );
}
  
export default Logout;