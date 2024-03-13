import { Box, Card } from '@mui/material';
import React, { useState } from 'react';
import { Post } from '../utils/type';
import PostCardContent from './PostCardContent';
import PostActions from './PostActions';
import PostReplySection from './PostReplySection';

const PostCard: React.FC<Post> = React.forwardRef(
	(
		{ title, patient_description, created_at, num_hugs, comments, onUpdateHug, selected },
		ref: any
	) => {
		const [expanded, setExpanded] = useState(false);

		const handleReplyClick = () => {
			setExpanded(!expanded);
		};

		const cardContent = (
			<Card sx={{ marginBottom: 5, width: '70%', minHeight: '210px' }}>
				<PostCardContent
					title={title}
					patient_description={patient_description}
				/>
				<PostActions
					num_hugs={num_hugs}
					comments={comments}
					created_at={created_at}
					onUpdateHug={onUpdateHug}
					expanded={expanded}
					handleReplyClick={handleReplyClick}
					selected={selected}
				/>
				<PostReplySection
					expanded={expanded}
					comments={comments}
				/>
			</Card>
		);
		const card = ref ? <Box ref={ref}>{cardContent}</Box> : <Box>{cardContent}</Box>;
		return card;
	}
);

export default PostCard;
