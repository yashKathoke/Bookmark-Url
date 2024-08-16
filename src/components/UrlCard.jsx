import React from 'react';
import { Delete, DeleteIcon, Edit, LucideDelete, Trash } from 'lucide-react';

const UrlCard = ({ url, iconUrl, title, onDel }) => {
  let new_url = ''
  if(iconUrl===null){
    new_url = '../components/assets/icon.svg'
  }
  else{
    new_url = iconUrl
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-800 p-4 rounded-lg shadow-md my-4 sm:my-8">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="flex-shrink-0">
          <img
            src={new_url}
            alt={title}
            className="w-8 h-8 rounded"
          />
        </div>
        <a href={url} target='_blank' className='truncate'>

        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
          <p className="text-sm text-gray-400 truncate" >{url}</p>
        </div>
        </a>
      </div>
      <button
        onClick={onDel}
        className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full self-end sm:self-auto mt-2 sm:mt-0"
      >
        <Trash size={20} />
      </button>
    </div>
  );
};

export default UrlCard;