import React, { useState, useEffect, FunctionComponent } from 'react';
import { httpGet } from '../../utils/ApiFacade';
import MyTable from '../../widgets/myTable';

type PostType = {
    id: number,
    title: string,
    teaser: string
}

const Posts: FunctionComponent = () => {
    const [posts, setPosts] = useState<Array<PostType>>([]);

    useEffect(() => {
        httpGet('/posts', 'Loaded posts').then((result) => setPosts(result));
    }, []);
          
    return (
        <>
            <h1>Posts</h1>
            <MyTable<PostType>
                data={posts}
                visible={true}
                mapping={{
                    'Id': (row) => (<>{row.id}</>),
                    'Title': (row) => (<>{row.title}</> ),
                    'Teaser': (row) => (<>{row.teaser}</>)
                }}
            />
        </>
    );
};

export default Posts;