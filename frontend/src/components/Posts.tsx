import React, { useCallback, useRef, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import useFetchPosts from '../hooks/useFetch';
import PostCard from './Card';

const PostsList: React.FC = () => {
	const [pageNum, setPageNum] = useState(1);
	const { isLoading, isError, error, results, hasNextPage } = useFetchPosts(pageNum);

	const intersectionObserver = useRef<IntersectionObserver>();
	const lastElementRef = useCallback(
		(post: any | null) => {
			if (isLoading || !post) return;
			if (intersectionObserver.current) intersectionObserver.current.disconnect();
			intersectionObserver.current = new IntersectionObserver((posts) => {
				if (posts[0].isIntersecting && hasNextPage) {
					console.log('We are near the last post!');
					setPageNum((prev) => prev + 1);
				}
			});

			if (post) intersectionObserver.current.observe(post);
		},
		[isLoading, hasNextPage]
	);

	if (isError) return <p>Error : {error.message}</p>;

	const posts = results.map((post, i) => {
		if (results.length === i + 1) {
			return (
				<PostCard
					ref={lastElementRef}
					key={post.post_url}
					title={post.title}
					patient_description={post.patient_description}
					created_at={post.created_at}
					num_hugs={post.num_hugs}
					comments={post.comments}
				/>
			);
		}
		return (
			<PostCard
				key={post.post_url}
				title={post.title}
				patient_description={post.patient_description}
				created_at={post.created_at}
				num_hugs={post.num_hugs}
				comments={post.comments}
			/>
		);
	});
	return (
		<Box
			width='100%'
			height='300px'
			mt='100px'>
			<Container sx={{ marginLeft: '30%' }}>
				{posts}

				{isLoading && <CircularProgress />}
			</Container>
		</Box>
	);
};

export default PostsList;
