import React, { useState, useEffect, FunctionComponent } from 'react';
import { httpGet, httpDelete } from '../../utils/ApiFacade';
import MyTable from '../../widgets/myTable';
import MyButton from '../../widgets/myButton';
import MySlider from '../../widgets/mySlider';
import EditPost from '../../components/EditPost';

type PostType = {
    id: number,
    title: string,
    teaser: string
}

const Posts: FunctionComponent = () => {
    const [posts, setPosts] = useState<Array<PostType>>([]);
    const visibilityState = useState<boolean>(false);
    const [sliderVisibility, setSliderVisibility] = visibilityState;

    const getPosts = () => {
        httpGet('/posts', 'Loaded posts successfully.').then((result) => setPosts(result.body));
    };

    const deletePost = (id: number) => {
        httpDelete(`/posts/${id}`, `Deleted post ${id} successfully.`).then(r => getPosts());
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <h1>Posts</h1>
            <MyTable<PostType>
                data={posts}
                visible={true}
                mapping={{
                    'Id': (row) => (<>{row.id}</>),
                    'Title': (row) => (<>{row.title}</>),
                    'Teaser': (row) => (<>{row.teaser}</>),
                    'Edit': (row) => (
                        <>
                            <MyButton
                                title="View post"
                                label="View"
                                href={`/post/${row.id}`}
                                visible={true}
                            />
                        </>
                    ),
                    'Delete': (row) => (
                        <>
                            <MyButton
                                title="Delete post"
                                label="Delete"
                                visible={true}
                                click={(e) => {
                                    deletePost(row.id);
                                    e.preventDefault();
                                }} />
                        </>
                    )

                }}
            />

            {/* Slider for creating new posts */}
            <MySlider visibilityState={visibilityState} onClose={getPosts}>
                <EditPost id={undefined}></EditPost>
            </MySlider>

            <MyButton click={() => { setSliderVisibility(!sliderVisibility); }} label="New Post"></MyButton>
            
        </>
    );
};

export default Posts;