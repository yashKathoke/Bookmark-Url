import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUrls } from '../store/postSlice'; // Adjust the import path as needed
import service from '../supabase/config'; // Adjust the import path as needed
import { ListUrls, Urlinput } from '../components';

function Home() {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.post.urls);
  const tags = useSelector((state) => state.tags);
  
  useEffect(() => {
    if (!status) {
      navigate('/login');
    }
  }, [status, navigate]);
  
  useEffect(() => {
    if (status) {
      service.getUrls().then((response) => {
        // console.log(response);
        dispatch(setUrls(response));
        // console.log(urls);
        
      });
      console.log("hello");
      
    }
  }, [status, dispatch]);
  
  if (status) {
    return (
      <div className='py-8 h-full'>
        <Urlinput />
        <ListUrls urls={urls} />

      </div>
    );
  } else {
    return null;
  }
}

export default Home;