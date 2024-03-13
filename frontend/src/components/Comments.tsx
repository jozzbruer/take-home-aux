import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const Comments = ({ name, key, text }: any) => (
	<List
		key={key}
		sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
		<ListItem>
			<ListItemAvatar>
				<Avatar>{/* <ImageIcon /> */}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={name}
				secondary={text}
			/>
		</ListItem>
	</List>
);

export default Comments;
