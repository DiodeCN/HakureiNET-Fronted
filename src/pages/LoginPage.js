import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: 'white',
  opacity:'1.0',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title>次元连接|绑定设备</title>
      </Helmet>


      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />



        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h2" gutterBottom>
            次元连接
            </Typography>
            <Typography variant="h2" gutterBottom>
            HakureiNET!
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              没有物联网设备？ {''}
              <Link variant="subtitle2">了解更多</Link>
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>



      </StyledRoot>
    </>
  );
}

/*
这个是一个设想，后面可以放开发人员
        {mdUp && (
          <StyledSection>
          <h2>这里弄几个Gird</h2>
          </StyledSection>
        )}
*/