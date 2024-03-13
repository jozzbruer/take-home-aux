import { Box, Collapse, TextField } from '@mui/material';
import Comments from './Comments';

const PostReplySection = ({ expanded, comments }: any) => {
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
					id='filled-basic'
					label='Reply'
					variant='filled'
					size='small'
					fullWidth
				/>
			</Box>
			<Box marginRight='10px'>
				{commentsArray.map((comment: any) => (
					<Comments
						key={comment.id}
						name={comment.display_name}
						text={comment.text}
					/>
				))}
			</Box>
		</Collapse>
	);
};

export default PostReplySection;
