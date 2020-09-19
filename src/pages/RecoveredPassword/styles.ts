import styled from 'styled-components/native'
import { Image } from 'react-native'

import colors from '../../styles/colors'

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  padding: 0 30px 100px;
`

export const SuccessImage = styled(Image)`
  max-width: 300px;
  max-height: 200px;
  margin-top: auto;
  margin-bottom: 20px;
  align-self: center;
`

export const Title = styled.Text`
  font-size: 24px;
  color: ${colors.dark};
  font-family: 'Poppins_700Bold';
`

export const Info = styled.Text`
  color: ${colors.darkShade};
  font-size: 14px;
  font-family: 'Rubik_400Regular';
  margin-bottom: 30px;
  margin-bottom: auto;
`
