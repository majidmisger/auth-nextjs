'use client'
import React, { CSSProperties } from 'react';
import { useEffect,useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


export default function Signup() {

  const router = useRouter()

  
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };




  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault(); // Prevent default form submission behavior

      toast.loading('Please wait...');
      const response = await axios.post('/api/users/signup', user);
      console.log(response.data);

      if (response.data.message && response.data.success) {
        toast.dismiss();

        toast.success(response.data.message);
        setTimeout(() => {

          router.push('/login')
        }, 1000);
      } else {
        toast.dismiss();
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Something went wrong');
    } finally {

    }
  }


  const loginContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '100px',
  };

  const loginFormStyle :CSSProperties= {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  };

  const inputStyle = {
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    color: 'black',
    // text-color: 'red',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };


  return (
    <div style={loginContainerStyle}>
    <h2>Sign up</h2>
    <form style={loginFormStyle} onSubmit={onSignup} >
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" style={inputStyle} value={user.email} onChange={handleChange} />

      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" style={inputStyle} value={user.username} onChange={handleChange} />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" style={inputStyle} value={user.password} onChange={handleChange} />

      <button style={buttonStyle}>
        Sign up
      </button>

      <Toaster />
    </form>
  </div>
  );
}
