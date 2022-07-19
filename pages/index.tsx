import { NextPage } from 'next';
import { Box, Heading, Flex, Center } from '@chakra-ui/react';
import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';
import { useAuth } from '@/contexts/auth_user.context';

const IndexPage: NextPage = function () {
  const { signInWithGoogle, authUser } = useAuth();
  console.info(authUser);

  return (
    <ServiceLayout title="누군가의 세계 | WHO-SEKAI" backgroundColor="gray.50" minH="100vh">
      <Box maxW="md" mx="auto" pt={10}>
        <img src="/main_logo.svg" alt="main logo" />
        <Flex justify="center">
          <Heading>누군가의 세계 | WHO-SEKAI</Heading>
        </Flex>
      </Box>
      <Center mt="20">
        <GoogleLoginButton onClick={signInWithGoogle} />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
