import React, { useState, useEffect, FunctionComponent } from 'react';
import { httpGet } from '../../utils/ApiFacade';
import { PostType } from '../../models/PostType';

interface PostProps {
    id: number;
  }

const Post: FunctionComponent<PostProps> = ({ id }) => {
    const [post, setPost] = useState<PostType>({} as PostType);

    useEffect(() => {
        httpGet(`/posts/${id}`, `Loaded post ${id} successfully.`).then((result) => setPost(result.body));
    }, []);
          
    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </>
    );
};

export default Post;