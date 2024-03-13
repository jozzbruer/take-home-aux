import { CardContent, Typography } from '@mui/material';

const PostCardContent = ({ title, patient_description }: any) => (
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
);

export default PostCardContent;
