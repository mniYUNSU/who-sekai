import {
  Spacer,
  Box,
  Flex,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  useColorMode,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '@/contexts/auth_user.context';

const GNB = function () {
  const { loading, authUser, signOut, signInWithGoogle } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  // bg: mode('gray.50', 'gray.900')(props),
  const bgGradient = useColorModeValue('linear(to-b, gray.50, white)', 'linear(to-b, gray.900, blackAlpha.700)');
  const fontColor = useColorModeValue('gray.900', 'white');
  const logoColor = useColorModeValue('/logo.svg', '/logo_dark.svg');

  const loginBtn = (
    <Button
      w={16}
      h={9}
      fontSize={{ base: 'xs', md: 'sm', lg: 'sm' }}
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
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<Avatar size="sm" src={authUser?.photoURL ?? 'https://bit.ly/broken-link'} />}
        borderRadius="full"
      />
      <MenuList>
        <MenuItem
          onClick={() => {
            window.location.href = `/${authUser?.email?.replace('@gmail.com', '')}`;
          }}
        >
          사용자 홈으로 이동
        </MenuItem>
        <MenuItem onClick={signOut}>로그아웃</MenuItem>
      </MenuList>
    </Menu>
  );

  const authInitialized = loading || authUser === null;

  return (
    <Box borderBottom={1} borderStyle="solid" borderColor="gray.200" bgGradient={bgGradient}>
      <Flex minH="60px" py={{ base: 2 }} px={{ base: 2 }} align="center" maxW="md" mx="auto">
        <img style={{ height: '40px', width: '50px' }} src={logoColor} alt="logo" />
        <Spacer />
        <Box ml={10}>
          <Text fontSize={{ base: 'md', md: 'md', lg: 'lg' }} color={fontColor} fontWeight={800} textAlign="center">
            WHO-SEKAI
          </Text>
        </Box>
        <Spacer />
        <Button
          w={10}
          fontSize="sm"
          borderRadius="100%"
          color="white"
          variant="ghost"
          bg="transparent"
          onClick={toggleColorMode}
          mr="2px"
          _focus={{
            boxShadow: '0',
          }}
        >
          <Icon as={colorMode === 'light' ? MoonIcon : SunIcon} w={5} h={5} color={fontColor} />
        </Button>
        <Box>{authInitialized ? loginBtn : logOutBtn}</Box>
      </Flex>
    </Box>
  );
};

export default GNB;
