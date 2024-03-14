import { Box, Collapse, TextField } from '@mui/material';
import { useState } from 'react';
import useFetchPosts from '../hooks/useFetch';
import CommentsList from './Comments';

const PostReplySection = ({ expanded, comments, url }: any) => {
	const { handleAddComment } = useFetchPosts();
	const [commentReply, setCommentsReply] = useState('');

	const submitedComments = (e: any) => {
		const date = new Date().toString();
		const reply = {
			id: 4,
			parent_id: null,
			display_name: 'Joz',
			text: commentReply,
			created_at: date,
		};
		if (commentReply.length > 5 && e.key === 'Enter') {
			handleAddComment(url, reply);
			setCommentsReply('');
		}
	};

	const commentsArray = Object.values(comments);
	return (
		<Collapse
			in={expanded}
			timeout='auto'
			unmountOnExit>
			<Box
				mb={2}
				ml={2}
				width='70%'>
				<TextField
					value={commentReply}
					id='filled-basic'
					label='Reply'
					variant='filled'
					size='small'
					fullWidth
					onChange={(e) => setCommentsReply(e.target.value)}
					onKeyDown={submitedComments}
				/>
			</Box>
			<Box marginRight='10px'>
				{commentsArray.map((comment: any, idx) => (
					<CommentsList
						key={idx}
						name={comment.display_name}
						text={comment.text}
						date={comment.created_at}
					/>
				))}
			</Box>
		</Collapse>
	);
};

export default PostReplySection;
