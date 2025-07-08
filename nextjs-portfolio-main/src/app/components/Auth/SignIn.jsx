import { Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const SignIn = ({ handleClose }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{
          style: {
            backgroundColor: '#8B5CF6', // Purple underline
          },
        }}
      >
        <Tab
          label="Sign Up"
          sx={{
            color: tabIndex === 0 ? '#88A3AF' : '#8B5CF6',
            fontWeight: tabIndex === 0 ? '700' : '500',
            textTransform: 'none',
          }}
        />
        <Tab
          label="Login"
          sx={{
            color: tabIndex === 1 ? '#88A3AF' : '#8B5CF6',
            fontWeight: tabIndex === 1 ? '700' : '500',
            textTransform: 'none',
          }}
        />
      </Tabs>

      <Box mt={2}>
        {tabIndex === 0 ? (
          <SignUpForm onSubmit={() => setTabIndex(1)} />
        ) : (
          <LoginForm handleClose={handleClose} />
        )}
      </Box>
    </Box>
  );
};

export default SignIn;
