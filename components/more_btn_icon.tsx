import { Icon, useColorModeValue } from '@chakra-ui/react';

const MoreBtnIcon = function () {
  const messageBoxColor = useColorModeValue('gray.500', 'gray.200');

  return (
    <Icon viewBox="0 0 24 24" color={messageBoxColor} fill={messageBoxColor}>
      <g>
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </g>
    </Icon>
  );
};

export default MoreBtnIcon;
