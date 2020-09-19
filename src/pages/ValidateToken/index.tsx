import React, { useCallback, useRef } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'
import colors from '../../styles/colors'

import { Container, Title, HelpText, Info } from './styles'

interface RequestData {
  token: string
}

const ValidateToken: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const handleSubmit = useCallback(async (data: RequestData) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        token: Yup.string().required('Código é obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const { token } = data

      const response = await api.post(`password/forgot/${token}`)

      if (response.status !== 200) {
        Alert.alert('Código inválido', 'Insira um código correto.')
        return
      }

      navigation.navigate('RecoverPassword')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }

      Alert.alert(
        'Erro ao validar código',
        'Ocorreu um erro ao validar o código, tente novamente.'
      )
    }
  }, [])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Title>Esqueceu sua senha?</Title>
          <HelpText>
            Enviamos para seu email um código para recuperar sua senha!
          </HelpText>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Info>Informe o código de recuperação</Info>
            <Input
              name="token"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Código"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Form>

          <Button
            enabled
            onPress={() => formRef.current?.submitForm()}
            icon={
              <Icon
                name="chevron-right"
                size={20}
                color={colors.primaryContrast}
              />
            }
          >
            Continuar
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ValidateToken
