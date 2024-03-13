import { BookmarkAdd, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Collapse, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const PostCard: React.FC = () => {
	const [expanded, setExpanded] = useState(false);

	const handleReplyClick = () => {
		setExpanded(!expanded);
	};
	return (
		<Card sx={{ marginBottom: 5, width: '70%', minHeight: '240px' }}>
			<CardContent>
				<Typography
					variant='h5'
					component='h2'>
					Title
				</Typography>
				<Typography
					variant='body2'
					component='p'>
					This is a sample text for the card component.
				</Typography>
			</CardContent>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'>
				<CardContent>
					<IconButton aria-label='add to hugs'>
						<FavoriteOutlined />
					</IconButton>
					<IconButton
						aria-label='reply'
						onClick={handleReplyClick}>
						{<ReplyOutlined />}
					</IconButton>
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
					<IconButton aria-label='save'>{<BookmarkAdd />}</IconButton>
				</CardContent>
				<p>time ago</p>
			</Box>
		</Card>
	);
};

export default PostCard;
