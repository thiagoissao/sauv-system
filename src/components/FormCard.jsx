import React from 'react'
import { Card as AntCard, Tooltip, Typography,  } from 'antd'
import {QuestionCircleOutlined} from '@ant-design/icons'

const Tip = ({title}) => {
  return(
    <Tooltip title={title}>
      <QuestionCircleOutlined />
    </Tooltip>
  )
}

const FormCard = ({ children, title, tip, ...props }) =>
  <AntCard
    title={<Typography.Title level={3}>{title}</Typography.Title>}
    extra={tip && <Tip title={tip} />}
    {...props}
  >
    {children}
  </AntCard>

export default FormCard
