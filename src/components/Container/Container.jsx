import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import {
	AppBar,
	IconButton,
	Drawer,
	Toolbar,
	Typography,
} from '@material-ui/core';
import {
	Menu as MenuIcon,
} from '@material-ui/icons';

import DrawerContent from '@/components/DrawerContent';
import { useDates } from '@/hooks/Dates';
import { useHotkeys } from '@/hooks/Hotkeys';
import useStyles from './Container.styled';

const propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

const Container = ({ children }) => {
	const { selectedDate } = useDates();
	const history = useHistory();
	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = useState(false);

	// Close drawer only in mobile
	const handleDrawerClose = () => setDrawerOpen(false);

	// Toggle drawer only in mobile unless toggle is true
	const handleDrawerToggle = () => setDrawerOpen((prevState) => !prevState);

	useHotkeys([
		// B = Toggle sidebar
		{
			keys: ['b'],
			callback: (event) => {
				event.preventDefault();
				setDrawerOpen((prevState) => !prevState);
			},
			metaModifier: true,
		},
		// P or S = Disable Event
		{
			keys: ['p', 's'],
			callback: (event) => event.preventDefault(),
			metaModifier: true,
		},
	]);

	// Run handleDrawerClose if the history changes
	useEffect(() => {
		const unlisten = history.listen(handleDrawerClose);
		return unlisten;
	}, [history]);

	return (
		<div className={classes.container}>
			<Helmet>
				<title>{`Is it ${selectedDate?.name || '...'}?`}</title>
			</Helmet>

			<AppBar elevation={0}>
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={handleDrawerToggle}
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} component="h1" variant="h6" noWrap>
						{`Is it ${selectedDate?.name || '...'}?`}
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer
				variant="temporary"
				anchor="left"
				open={drawerOpen}
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
				onClose={handleDrawerClose}
				ModalProps={{ keepMounted: true }}
			>
				<DrawerContent />
			</Drawer>

			{children}
		</div>
	);
};

Container.propTypes = propTypes;

export default Container;