import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUrls } from '../store/postSlice';
import service from '../supabase/config';
import { ListUrls, Urlinput } from '../components';

function Home() {
  const { status, userData } = useSelector((state) => ({
    status: state.auth.status,
    userData: state.auth.userData,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.post.urls);

  useEffect(() => {
    if (!status) {
      navigate('/login');
    }
  }, [status, navigate]);

  useEffect(() => {
    if (status && userData) {
      service.getUrls({ userId: userData.id }).then((response) => {
        dispatch(setUrls(response));
      });
    }
  }, [status, userData.id, dispatch]);

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
