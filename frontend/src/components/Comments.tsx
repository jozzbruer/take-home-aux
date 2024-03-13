import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import useDaysAgo from '../hooks/useDaysAgo';

const Comments = ({ name, key, text, date }: any) => (
	<List
		key={key}
		sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
		<ListItem>
			<ListItemAvatar>
				<Avatar>{/* <ImageIcon /> */}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={
					<>
						<Box
							display='flex'
							alignItems='center'>
							{name}{' '}
							<Box
								ml={1}
								fontSize='15px'>
								{useDaysAgo(date)} ago
							</Box>
						</Box>
					</>
				}
				secondary={text}
			/>
		</ListItem>
		<Divider
			variant='inset'
			component='li'
		/>
	</List>
);

export default Comments;
