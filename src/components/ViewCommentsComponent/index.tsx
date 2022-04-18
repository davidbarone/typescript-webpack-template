import React, { useState, useEffect, FunctionComponent } from 'react';
import { httpGet, httpPost, httpPut } from '../../utils/ApiFacade';
import { PostType } from '../../models/PostType';
import MyInput from '../../widgets/myInput';
import MyButton from '../../widgets/myButton';
import { formToJson } from '../../utils/Utilities';
import { CommentModel } from '../../models/CommentModel';
import MySlider from '../../widgets/mySlider';
import EditCommentComponent from '../EditCommentComponent';

interface ViewCommentProps {
    postId: number,
    comments: CommentModel[];
}

const SingleComment = (comment: CommentModel) => {
    return (
        <table>
            <tr>
                <td style={{ minWidth: '200px', verticalAlign: 'top', hyphens: 'none' }}>
                    <div style={{ fontWeight: 600 }}>{comment.user} on {comment.createdDt.toString()}</div>
                </td>
                <td>
                    {comment.comment}
                </td>
            </tr>
        </table>
    );
};

const ViewCommentsComponent: FunctionComponent<ViewCommentProps> = ({ postId, comments }) => {
    const visibilityState = useState<boolean>(false);
    const [sliderVisibility, setSliderVisibility] = visibilityState;


    return (
        <>
            <h2>Comments</h2>
            {
                comments ? comments.map(c => SingleComment(c)) : ''
            }

            <MyButton click={() => { setSliderVisibility(!sliderVisibility); }} label="New Comment"></MyButton>

            {/* Slider for creating new comments */}
            <MySlider visibilityState={visibilityState}>
                <EditCommentComponent postId={postId}></EditCommentComponent>
            </MySlider>

        </>
    );
};

export default ViewCommentsComponent;