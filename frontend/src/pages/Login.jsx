import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useRegister, useLogin } from '../api/authApi'; // ✅ custom React Query hooks

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { mutate: registerUser, isLoading: isRegistering } = useRegister({
    onSuccess: (response) => {
      toast.success('Registration successful!');
      setToken(response.token);
      localStorage.setItem('token', response.token);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const { mutate: loginUser, isLoading: isLoggingIn } = useLogin({
    onSuccess: (response) => {
      toast.success('Login successful!');
      console.log('response',response)
      setToken(response.token);
      localStorage.setItem('token', response.token);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currentState === 'Sign Up') {
      registerUser({ name, email, password });
    } else {
      loginUser({ email, password });
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
<form
  onSubmit={onSubmitHandler}
  className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 p-6 rounded-2xl shadow-lg"
  style={{
    background: "linear-gradient(100deg, #f2dbdd, #e5b7ba, #ca6e75)"
  }}
>

      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl text-black">Login</p>
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800 rounded-lg"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800 rounded-lg"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        className="bg-black text-white font-light px-8 w-2/3 py-2 mt-4 rounded-lg "
        disabled={isLoggingIn || isRegistering}
      >
        {isLoggingIn || isRegistering
          ? 'Processing...'
          : currentState === 'Login'
          ? 'Sign In'
          : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
