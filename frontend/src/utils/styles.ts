import { makeStyles, Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	title: {
		flexGrow: 1,
	},
}));
