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

import { Container, Title, HelpText } from './styles'

interface RequestCodeData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const handleSubmit = useCallback(async (data: RequestCodeData) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um email válido')
          .required('Email é obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const { email } = data

      const response = await api.post('password/forgot', {
        email
      })

      navigation.navigate('ValidateToken', { token: response.data })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }

      Alert.alert(
        'Erro ao enviar o email',
        'Ocorreu um erro ao enviar o email, tente novamente.'
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
            Não se preocupe! Informe seu email para continuar.
          </HelpText>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              returnKeyType="send"
              icon="mail"
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

export default ForgotPassword
