import React, { useState } from 'react';
import service from '../supabase/config';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUrl } from '../store/postSlice';
import { UrlCard } from './index';

const ListUrls = ({ urls = [] }) => {
  const tags = useSelector((state) => state.tags.tags);
  const [tag, setTag] = useState('all');
  const dispatch = useDispatch();

  const filteredUrls = tag === 'all' ? urls : urls.filter((url) => url.tag === tag);

  const handleDelete = (id) => {
    console.log('id:: ', id);
    service.deleteUrl(id);
    dispatch(deleteUrl(id));
  };

  if (urls &&urls.length === 0) {
    return (
      <div className='py-8 max-w-5xl m-auto bg-gray-700 my-9 p-10'>
        <h1 className='text-2xl text-center text-white'>No URLs added yet</h1>
      </div>
    );
  }

  return (
    <div className='py-8 max-w-5xl m-auto bg-gray-700 my-9 p-10'>
      <div className='flex flex-col'>
        <select
          className='p-2 bg-gray-800 text-white w-full h-fit'
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
        >
          <option value='all'>All</option>
          {tags && tags.map((tag) => (
            <option key={nanoid()} value={tag.tag}>
              {tag.tag}
            </option>
          ))}
        </select>
        <div>
          {filteredUrls && filteredUrls.map((url) => (
            <UrlCard
              key={url.id}
              url={url.url}
              iconUrl={url.iconUrl}
              title={url.title}
              onDel={() => handleDelete(url.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListUrls;
