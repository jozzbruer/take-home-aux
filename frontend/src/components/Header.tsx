import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: React.FC = () => {
	return (
		<Box>
			<AppBar>
				<Toolbar>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}>
						Community
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
