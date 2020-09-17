import React, { ReactElement } from 'react'

import { BaseButtonProperties } from 'react-native-gesture-handler'
import { Container, ButtonText } from './styles'

interface ButtonProps extends BaseButtonProperties {
  outline?: boolean
  icon?: ReactElement
}

const Button: React.FC<ButtonProps> = ({
  children,
  outline,
  icon,
  ...rest
}) => (
  <Container outline={outline} {...rest}>
    <ButtonText outline={outline} enabled={rest.enabled}>
      {children}
    </ButtonText>
    {icon}
  </Container>
)

export default Button
