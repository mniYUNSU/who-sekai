import { Text } from '@chakra-ui/react';

const PrintText = function ({ printText }: { printText: string }) {
  const textCount = printText.length;
  const usedText = textCount > 150 ? `${printText.substring(0, 149)} ...` : printText;
  return (
    <Text whiteSpace="pre-line" p="8" px="10" position="absolute" fontSize="32px" fontFamily="Pretendard" color="white">
      {usedText}
    </Text>
  );
};

export default PrintText;
