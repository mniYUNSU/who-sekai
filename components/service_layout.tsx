/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { Box, BoxProps } from '@chakra-ui/react';
import GNB from './GNB';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const ServiceLayout: React.FC<Props & BoxProps> = function ({ title = 'YunsuBlah', children, ...boxProps }) {
  return (
    <Box {...boxProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <GNB />
      {children}
    </Box>
  );
};
