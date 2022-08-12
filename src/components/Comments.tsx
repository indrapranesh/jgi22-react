import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import qs from 'qs';
import { BACKEND_URL } from '../constants/url.constants';
import moment from 'moment';

function Comments(props) {
  const params: { audit: string} = useParams();
  
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('')
  const {search} = useLocation();
  const query = qs.parse(search.slice(1))
  const userId = query.userId || 2;
  const auditId: any = query.auditId || params.audit;
  const [user, setUser] = useState({} as any)
  

  const addComment = () => {
    axios.post(`${BACKEND_URL}comments?auditId=${auditId}`, {
      userId: userId,
      audit_id: parseInt(auditId),
      comment: message
    })
    .then((res) => {
      getComments();
      setMessage('');
    })
  }

  const getComments =  () => {
    axios.get(`${BACKEND_URL}comments?auditId=${auditId}`)
    .then((res) => {
      setComments(res.data)
    });
  }

  useEffect(() => {
    getComments();
    axios.get(`${BACKEND_URL}user/${userId}`)
    .then((res) => {
      setUser(res)
    })
  }, [])

  return (
    <>
      <div className='flex justify-center'>
        <div style={{'height': '550px', 'width': '700px'}} className="flex flex-col overflow-auto justify-end">
          {
            comments.map((comment: any, index) => (
              <div className='flex flex-col py-5' key={index}>
                <div className='flex items-center '>
                  <p className='m-0 font-semibold text-blue-700'>{comment?.user?.name}</p>
                  <p className='font-extralight text-stone-500 text-sm pl-3'>{moment(comment?.createdDate).fromNow()}</p>
                </div>
                <div>
                  <p className='font-normal'>{comment?.comment}</p>
                </div>
              </div>
            ))
          }
          <div className='flex'>
              <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Comment"
              multiline
              value={message}
              onChange={(evt) => setMessage(evt.target.value)}
              rows={4}
            />
            <div className='pl-5 flex items-start w-2/5'>
            <Button variant="contained" onClick={addComment} fullWidth>Add comment</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;