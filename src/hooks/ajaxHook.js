import {useState} from 'react';
import axios from 'axios';

const useAjax = ()=>{
  const [list, setList] = useState([]);
  
  const apiCall = (url, method, body) => {
      
    let config = {
      method: method,
      url,
      data: body,
      headers: { 'Content-Type': 'application/json' },
    };
  
    axios.request(config)
      .then(response => response.data)
      .then(item => {
        if (method === 'delete'){
          setList(list.filter(listItem => listItem._id !== item._id));
        } else if (method === 'post'){
          setList([...list, item]);
        } else if (method === 'get'){
          setList(item);
        } else if (method === 'put'){
          setList(list.map(listItem => listItem._id === item._id ? item : listItem));
        }
  
      })
      .catch(console.error);
  };
  return {list, apiCall};
};
  
export default useAjax;
