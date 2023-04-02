import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 96;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH - 15}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  fontSize: '1.5rem',
}));


Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <Box sx={{ flexGrow: 1 }}>
          <StyledTypography sx={{ color: 'black' }}>
            次元连接|HakureiNET!
          </StyledTypography>
        </Box>
        <Stack direction="row" spacing={0}>
          <Box sx={{ display: { md: 'block' } }}>
            <IconButton color="inherit" href="/dashboard/app">
              <Typography variant="subtitle1">主页</Typography>
            </IconButton>
          </Box>
          <Box sx={{ display: { md: 'block' } }}>
            <IconButton color="inherit" href="/dashboard/user">
              <Typography variant="subtitle1">环境</Typography>
            </IconButton>
          </Box>
          <Box sx={{ display: { md: 'block' } }}>
            <IconButton color="inherit" href="/dashboard/about">
              <Typography variant="subtitle1">关于</Typography>
            </IconButton>
          </Box>
          <Box sx={{ display: { md: 'block' } }}>
            <IconButton color="inherit" href="/login">
              <Typography variant="subtitle1">绑定</Typography>
            </IconButton>
          </Box>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
