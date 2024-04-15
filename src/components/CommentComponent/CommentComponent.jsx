import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import * as CommentService from '../../services/CommentService'
import { useSelector } from 'react-redux';

const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <>
//   <List
//     renderItem={comment => (
//       <List.Item style={{height:'70px'}}>
//       <div style={{ marginRight:'10px'}}>
//         {<span>{comment.user.name}</span>}
//           </div>
//           <div>
//          {<Avatar src={comment.user.avatar} />}
//           </div>
//           {<h3 style={{marginLeft:'8px'}}>:</h3>}
//           <List.Item.Meta
//           style={{marginLeft:'8px'}}
//           // avatar={<Avatar src={comment.user.avatar} />}
//           title={<a>{comment.content}</a>}
//         />
//       </List.Item>
//     )}
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//   />
//   </>
// );

const CommentList = ({ comments }) => (
  <>
    <List
      renderItem={(comment) => (
        comment.content &&
        !(comment.content.toLowerCase().includes('tôi đẹp trai') ||
        ((comment.content.toLowerCase()) === 'haha')||
        ((comment.content.toLowerCase())==='*')||
        ((comment.content.toLowerCase())==='abc')||
        ((comment.content.toLowerCase())==='.')||
        ((comment.content.toLowerCase())==='bạn')||
        ((comment.content.toLowerCase())===' ')
        ) 
        && ((comment.content.toLowerCase().includes('điện thoại')) || (comment.content.toLowerCase().includes('sản phẩm')))
         ? (
          <List.Item style={{ height: '70px' }}>
            <div style={{ marginRight: '10px' }}>
              <span>{comment.user.name}</span>
            </div>
            <div>
              <Avatar src={comment.user.avatar} />
            </div>
            <h3 style={{ marginLeft: '8px' }}>:</h3>
            <List.Item.Meta
              style={{ marginLeft: '8px' }}
              title={<a>{comment.content}</a>}
            />
          </List.Item>
        ) : null
      )}
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
    />
  </>
);

const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item>
      <TextArea
        name="content"
        rows={4}
        onChange={onChange}
        value={value}
        style={{width:'1100px'}}
      />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);


const CommentComponent = ({idProduct }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const user = useSelector((state) => state.user)
  console.log('user', user);
  const fetchComments = async () => {
    try {
     const response = await CommentService.commentList( {params: {product: idProduct }},  user.access_token )
      // const response = await CommentService.;
      console.log('response', response);
      setComments(response.data.reviews);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async () => {
    try {
    await CommentService.createComment({userId: user.id, access_token: user.access_token, content: newComment, idProduct: idProduct}).then((res) => {
      if(res.data.content){
        fetchComments()
        setNewComment("")
      }
    })
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []); 

  return (
    <div>
      <h2>Comments</h2>
      <CommentList comments={comments}/>
      <Comment
        avatar={<Avatar src={user.avatar} alt="Your Name" />}
        content={
          <Editor
            onChange={(e) => setNewComment(e.target.value)}
            onSubmit={handleSubmit}
            value={newComment}
          />
        }
      />
    </div>
  );
};

export default CommentComponent;
