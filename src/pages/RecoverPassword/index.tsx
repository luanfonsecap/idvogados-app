import React, { useCallback, useRef, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useNavigation, useRoute } from '@react-navigation/native'

import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api'
import getValidationErrors from '../../utils/getValidationErrors'
import colors from '../../styles/colors'

import { Container, Title } from './styles'

interface RequestData {
  password: string
  passwordConfirmation: string
}

interface RouteParams {
  token: string
}

const RecoverPassword: React.FC = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [hidePasswordConfirmation, setHidePasswordConfirmation] = useState(true)
  const formRef = useRef<FormHandles>(null)
  const passwordConfirmationInputRef = useRef<TextInput>(null)
  const navigation = useNavigation()
  const route = useRoute()
  const routeParams = route.params as RouteParams

  const handleSubmit = useCallback(async (data: RequestData) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('Código é obrigatório')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm,
            'A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial'
          ),
        passwordConfirmation: Yup.string()
          .required('Confirmação de senha é obrigatório')
          .oneOf([Yup.ref('password')], 'Senhas não conferem')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const { password, passwordConfirmation } = data

      const response = await api.post('password/reset', {
        token: routeParams.token,
        password,
        passwordConfirmation
      })

      if (response.status !== 204) {
        Alert.alert(
          'Ocorreu um erro ao atualizar sua senha',
          'Não foi possível atualizar sua senha.'
        )
        return
      }

      navigation.navigate('RecoveredPassword')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }

      Alert.alert(
        'Erro ao atualizar sua senha',
        'Ocorreu um erro ao atualizar sua senha, tente novamente.'
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
          <Title>Escolha sua nova senha</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              iconRight={hidePassword ? 'eye-off' : 'eye'}
              secureTextEntry={hidePassword}
              onPressRightIcon={() => setHidePassword(state => !state)}
              placeholder="Escolha uma nova senha"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordConfirmationInputRef.current?.focus()
              }
            />
            <Input
              ref={passwordConfirmationInputRef}
              name="passwordConfirmation"
              autoCapitalize="none"
              iconRight={hidePasswordConfirmation ? 'eye-off' : 'eye'}
              secureTextEntry={hidePasswordConfirmation}
              onPressRightIcon={() =>
                setHidePasswordConfirmation(state => !state)
              }
              autoCorrect={false}
              placeholder="Confirme sua senha"
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

export default RecoverPassword
