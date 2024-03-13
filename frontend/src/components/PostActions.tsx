import { BookmarkAdd, Favorite, ReplyOutlined } from '@mui/icons-material';
import { Box, CardContent, IconButton } from '@mui/material';
import useDaysAgo from '../hooks/useDaysAgo';

const PostActions = ({
	num_hugs,
	comments,
	created_at,
	onUpdateHug,
	handleReplyClick,
	selected,
}: any) => (
	<Box
		display='flex'
		alignItems='center'
		justifyContent='space-between'>
		<CardContent>
			<IconButton
				style={{ color: selected ? '#FF83B6' : '', fontSize: '15px' }}
				aria-label='add to hugs'
				onClick={onUpdateHug}>
				<Favorite /> {num_hugs} hugs
			</IconButton>
			<IconButton
				aria-label='reply'
				style={{ fontSize: '15px' }}
				onClick={handleReplyClick}>
				<ReplyOutlined /> {Object.keys(comments!).length} comments
			</IconButton>
			<IconButton
				aria-label='save'
				style={{ fontSize: '15px' }}>
				<BookmarkAdd />
			</IconButton>
		</CardContent>
		<p>{useDaysAgo(created_at)} days ago</p>
	</Box>
);

export default PostActions;
