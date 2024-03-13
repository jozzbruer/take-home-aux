import { Collapse, TextField } from '@mui/material';

const PostReplySection = ({ expanded }: any) => (
	<Collapse
		in={expanded}
		timeout='auto'
		unmountOnExit>
		<TextField
			id='outlined-multiline-static'
			label='Reply'
			fullWidth
			variant='outlined'
		/>
	</Collapse>
);

export default PostReplySection;
