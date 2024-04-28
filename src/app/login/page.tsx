'use client'
import React, { CSSProperties } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect,useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Login() {


  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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
    color: 'black',
    padding: '8px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };






  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault(); // Prevent default form submission behavior

      toast.loading('Please wait...');
      const response = await axios.post('/api/users/login', user);
      console.log('POST LOGIN ',response.data);

      if (response.data.message && response.data.success) {
        toast.dismiss();

        toast.success(response.data.message);
        setTimeout(() => {

          router.push('/profile')
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



  return (
    <div style={loginContainerStyle}>
      <h2>Login</h2>
      <form style={loginFormStyle} onSubmit={onLogin} >
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" style={inputStyle} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" style={inputStyle} onChange={handleChange} />
        <button  style={buttonStyle}>
          Login
        </button>


      <Toaster />
      </form>
    </div>
  );
}
