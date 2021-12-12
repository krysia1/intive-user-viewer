import { Typography } from 'antd';
import React from 'react';

const { Paragraph } = Typography;

export const getParagraph = (
  text: string | React.ReactNode,
  className = ''
) => (
  <Paragraph
    className={`column-ellipsis ${className}`}
    ellipsis={{
      tooltip: true,
    }}
  >
    {text}
  </Paragraph>
);
