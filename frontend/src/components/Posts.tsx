import React from 'react';
import PostCard from './Card';
import { Box, Container } from '@mui/material';

const PostsList: React.FC = () => {
	return (
		<Box
			width='100%'
			height='300px'
			mt='100px'>
			<Container sx={{ marginLeft: '30%' }}>
				<PostCard />
				<PostCard />
				<PostCard />
				<PostCard />
				<PostCard />
				<PostCard />
				<PostCard />
				<PostCard />
			</Container>
		</Box>
	);
};

export default PostsList;
