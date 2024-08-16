import React, {useState, useEffect} from 'react'
import service from '../supabase/config'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUrl } from '../store/postSlice'
import {UrlCard} from './index'



function ListUrls({urls = []}) {
  const tags = useSelector(state => state.tags.tags)
  const [tag, setTag] = useState("all")
  const dispatch = useDispatch()


  function onDel(id){
    console.log('id:: ', id);
    service.deleteUrl(id)
    dispatch(deleteUrl(id))
  }

  if (urls.length === 0) {
    return (
      <div className='py-8 max-w-5xl m-auto bg-gray-700 my-9 p-10'>
        <h1 className='text-2xl text-center text-white'>No URLs added yet</h1>
      </div>
    )
    
  }else{
  return (
    <div className='py-8 max-w-5xl m-auto bg-gray-700 my-9 p-10'>

      <div  className='flex flex-col'>

        <select className='p-2 bg-gray-800 text-white w-full h-fit' value = {tag} onChange={(e) => {
          setTag(e.target.value)

        }}>
          <option value="all">All</option>
          {tags && tags.map((tag) => (
            <option key={nanoid()} value={tag.tag}>{tag.tag}</option>
          ))}
        </select>
        <div>
          {tag !== 'all' && urls && urls.filter((url) => url.tag === tag).map((url) => (
            <UrlCard key={nanoid()} url={url.url} iconUrl={url.iconUrl} title={url.title} onDel={(e) => {
              onDel(url.id)
            }}/>
          ))}
          {tag == 'all' && urls && urls.map((url) => (
            <UrlCard key={nanoid()} url={url.url} iconUrl={url.iconUrl} title={url.title} onDel={(e) => {
              onDel(url.id)
            }}/>
          ))}
          {/* {urls && urls.map((url) => (
            <UrlCard key={nanoid()} url={url.url} iconUrl={url.iconUrl} title={url.title} onDel={(e) => {
              onDel(url.id)
            }}/>
          ))} */}

        </div>

      </div>

      
    </div>
  )
}
}

export default ListUrls