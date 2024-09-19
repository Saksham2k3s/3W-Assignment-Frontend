import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllUsers } from './redux/slices/getAllUserSlice';
import axios from 'axios';
import UserList from './components/UserList';
import './App.css';
import { Toaster } from 'react-hot-toast';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
     <div className='min-w-screen' >
        {/* Toast Notifications */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />

      {/* Main Content */}
      <div className=' min-h-screen font-serif w-full '>
        <UserList />
      </div>
     </div>
    </>
  );
}

export default App;
