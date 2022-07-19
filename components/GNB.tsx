import { Spacer, Box, Flex, Button, Text } from '@chakra-ui/react';
import { useAuth } from '@/contexts/auth_user.context';

const GNB = function () {
  const { loading, authUser, signOut, signInWithGoogle } = useAuth();

  const loginBtn = (
    <Button
      fontSize="sm"
      fontWeight={600}
      color="white"
      bg="teal.400"
      _hover={{ bg: 'teal.300' }}
      onClick={signInWithGoogle}
    >
      로그인
    </Button>
  );

  const logOutBtn = (
    <Button as="a" fontWeight={400} variant="link" onClick={signOut} _hover={{ cursor: 'pointer' }}>
      로그아웃
    </Button>
  );

  const authInitialized = loading || authUser === null;

  return (
    <Box borderBottom={1} borderStyle="solid" borderColor="gray.200" bg="white">
      <Flex minH="60px" py={{ base: 2 }} px={{ base: 4 }} align="center" maxW="md" mx="auto">
        {/* <Spacer /> */}
        <Box>
          <img style={{ height: '40px', width: '100%' }} src="/logo.svg" alt="logo" />
        </Box>
        <Spacer />
        <Box>
          <Text fontSize="lg" fontWeight={800}>
            WHO-SEKAI
          </Text>
        </Box>
        <Spacer />
        <Box>{authInitialized ? loginBtn : logOutBtn}</Box>
      </Flex>
    </Box>
  );
};

export default GNB;
