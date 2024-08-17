import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, SelectTag } from '../index';
import service from '../../supabase/config';
import usePageInfo from '../../hooks/usePageInfo';
import { addUrl } from '../../store/postSlice';
import { setTags, addTag } from '../../store/tagSlice';
import { v4 as uuidv4 } from "uuid";

function URLInput() {
  const userData = useSelector((state) => state.auth.userData);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      url: '',
      tag: '',
    },
  });
  const [url, setUrl] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [id, setId] = React.useState(null);

  const { pageTitle, faviconUrl, error } = usePageInfo(url);
  const dispatch = useDispatch();
  let tags = useSelector(state => state.tags.tags);
  

  // Function to get the root domain name
  function getRootDomain(url) {
    try {
      if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
      }
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      const parts = hostname.split('.');
      if (parts.length > 1) {
        return parts.slice(-2, -1)[0];
      }
      return hostname;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  }

  const onAdd = async (data) => {
    setUrl(data.url);
    setTag(data.tag);
    const selectedTag = data.tag;

    // Check if the tag is already in the Set
    // if (!(tags)) {
    //   console.log('Adding tag:', selectedTag);
      
    //   dispatch(addTag(selectedTag));
    // }
    dispatch(addTag({tag: selectedTag}));
    setId(uuidv4());
    console.log('Input reset called');
    reset({ url: '', tag: '' });
  };

  useEffect(() => {
    const submitData = async () => {
      const date = new Date().toISOString();
      await service.addUrl({
        url: url,
        iconUrl: faviconUrl || null,
        title: pageTitle || url,
        userId: userData.id,
        created_at: date,
        id: id,
        tag: tag
      });
    };

    if (url && pageTitle && faviconUrl !== null && !error) {
      submitData();
      dispatch(addUrl({ url, iconUrl: faviconUrl, title: pageTitle, userId: userData.id, id: id, tag: tag }));
    }
  }, [pageTitle, faviconUrl, error, url, userData.id, tag]);

  useEffect(() => {
    if (error && url) {
      const fullUrl = url;
      let new_url = `${new URL(fullUrl).protocol}//${new URL(fullUrl).host}`;
      if (!url.startsWith('http')) {
        new_url = 'https://' + url;
      }
      if (new_url.endsWith('/')) {
        new_url += 'favicon.ico';
      } else {
        new_url += '/favicon.ico';
      }

      const date = new Date().toISOString();
      service.addUrl({
        url: url,
        iconUrl: new_url,
        title: getRootDomain(url),
        userId: userData.id,
        created_at: date,
        id: id,
        tag: tag
      });
      dispatch(addUrl({ url, iconUrl: new_url, title: getRootDomain(url), userId: userData.id, id: id, tag: tag }));
    }
  }, [error, url, userData.id,tag]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await service.getTags({userId:userData.id});
        dispatch(setTags(data));
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    
    if (userData) {
      // console.log(userData.id);
      
      fetchTags();

    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-2xl mx-4 sm:mx-auto max-w-md sm:max-w-lg">
      <form className="space-y-6" onSubmit={handleSubmit(onAdd)} autoComplete='off'>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">URL:</label>
            <Controller
              name="url"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="url"
                  {...field}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  placeholder="Enter URL"
                />
              )}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="tag" className="block text-sm font-medium text-gray-300 mb-1">Tag:</label>
            <SelectTag
              tags={tags}
              control={control}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold  rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default URLInput;
