import React, { useState, useEffect, FunctionComponent } from 'react';
import { httpGet, httpPost, httpPut } from '../../utils/ApiFacade';
import MyInput from '../../widgets/myInput';
import { formToJson } from '../../utils/Utilities';
import { CommentModel } from '../../models/CommentModel';

interface CommentProps {
    id?: number;
    postId: number
}

const EditCommentComponent: FunctionComponent<CommentProps> = ({ id = null, postId }) => {
    const commentState = useState<CommentModel>({} as CommentModel);
    const [comment, setComment] = commentState;

    useEffect(() => {
        if (id) {
            httpGet(`/comments/${id}`, `Loaded comment ${id} successfully.`).then((result) => setComment(result.body));
        } else {
            setComment({
                id: undefined,
                postId: postId,
                comment: '',
                user: '',
                createdDt: new Date()
            });
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const json = formToJson(e.currentTarget);
        if (id) {
            // update
            httpPut(`/comments/${id}`, json, `Comment ${id} updated successfully.`);
        } else {
            httpPost('/comments/', json, 'Comment created successfully.');
        }
        e.preventDefault();
    };


    return (
        <form onSubmit={handleSubmit}>
            <h1>Add / Edit Comment</h1>
            <MyInput name='postId' state={commentState} type='hidden'></MyInput>
            <MyInput
                label='User'
                name='user'
                state={commentState}
                type='text' />

            <MyInput
                label='Comment'
                name='comment'
                type='text'
                state={commentState}
                rows={5} />

            <MyInput
                type='submit'
            />
        </form>
    );
};

export default EditCommentComponent;