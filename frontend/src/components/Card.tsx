import { BookmarkAdd, Favorite, ReplyOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Collapse, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Post } from '../utils/type';
import useDaysAgo from '../hooks/useDaysAgo';

const PostCard: React.FC<Post> = React.forwardRef(
	(
		{ title, patient_description, created_at, num_hugs, comments, onUpdateHug, selected },
		ref: any
	) => {
		const [expanded, setExpanded] = useState(false);

		const handleReplyClick = () => {
			setExpanded(!expanded);
		};
		const handleHugUpdate = () => {
			onUpdateHug();
		};

		const cardContent = (
			<Card sx={{ marginBottom: 5, width: '70%', minHeight: '210px' }}>
				<CardContent>
					<Typography
						variant='h5'
						component='h2'>
						{title}
					</Typography>
					<Typography
						variant='body2'
						component='p'>
						{patient_description}
					</Typography>
				</CardContent>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'>
					<CardContent>
						<IconButton
							style={{ color: selected ? '#FF83B6' : '', fontSize: '15px' }}
							aria-label='add to hugs'
							onClick={handleHugUpdate}>
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
							{<BookmarkAdd />}
						</IconButton>
					</CardContent>
					<p>{useDaysAgo(created_at)} days ago</p>
				</Box>
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
			</Card>
		);
		const card = ref ? <Box ref={ref}>{cardContent}</Box> : <Box>{cardContent}</Box>;
		return card;
	}
);

export default PostCard;
