import styled from 'styled-components/native'

import colors from '../../styles/colors'

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;

  padding: 0 30px 100px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: ${colors.dark};
  font-family: 'Poppins_700Bold';
`

export const HelpText = styled.Text`
  color: ${colors.darkShade};
  font-size: 14px;
  font-family: 'Rubik_400Regular';
  margin-bottom: 40px;
`
