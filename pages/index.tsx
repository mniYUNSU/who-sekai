import { NextPage } from 'next';
import { Box, Heading, Flex, Center, useColorModeValue } from '@chakra-ui/react';
import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';
import { useAuth } from '@/contexts/auth_user.context';

const IndexPage: NextPage = function () {
  const { signInWithGoogle, authUser } = useAuth();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const logoColor = useColorModeValue('/main_logo.svg', 'main_logo_dark.svg');

  console.info(authUser);

  return (
    <ServiceLayout title="누군가의 세계 | WHO-SEKAI" backgroundColor={bgColor} minH="100vh">
      <Box maxW={{ base: 'sm', md: 'md', lg: 'md' }} mx="auto" pt={10}>
        <img src={logoColor} alt="main logo" />
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
