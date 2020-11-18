import React from 'react'
import { Card as AntCard, Typography } from 'antd'

const FormCard = ({ children, title, ...props }) =>
  <AntCard
    title={<Typography.Title level={3}>{title}</Typography.Title>}
    {...props}
  >
    {children}
  </AntCard>

export default FormCard
