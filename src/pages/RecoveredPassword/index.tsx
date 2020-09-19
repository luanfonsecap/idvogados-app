import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import Button from '../../components/Button'
import colors from '../../styles/colors'
import successImage from '../../assets/images/success-image-temp.png'

import { Container, Title, Info, SuccessImage } from './styles'
const RecoveredPassword: React.FC = () => {
  const navigation = useNavigation()

  return (
    <Container>
      {/* TODO imagem temporária até definição da mesma pelo time de design */}
      <SuccessImage source={successImage} />

      <Title>Pronto!</Title>
      <Info>Sua nova senha foi cadastrada com sucesso.</Info>

      <Button
        enabled
        onPress={() => navigation.navigate('SignIn')}
        icon={
          <Icon name="chevron-right" size={20} color={colors.primaryContrast} />
        }
      >
        Continuar
      </Button>
    </Container>
  )
}

export default RecoveredPassword
