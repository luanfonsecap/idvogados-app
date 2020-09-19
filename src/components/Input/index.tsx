import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'
import { Container, TextInput, Icon, Caption } from './styles'
import colors from '../../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface InputProps extends TextInputProps {
  name: string
  iconRight?: string
  onPressRightIcon?: () => void
  iconLeft?: string
  onPressLeftIcon?: () => void
  caption?: string
}

interface InputValueReference {
  value: string
}

interface InputRef {
  focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {
    name,
    iconRight,
    onPressRightIcon,
    iconLeft,
    onPressLeftIcon,
    caption,
    ...rest
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const inputElementRef = useRef<any>(null)
  const { fieldName, registerField, error, defaultValue = '' } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputValueRef.current.value)
  }, [])

  /**
   setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
 */

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    }
  }))

  return (
    <>
      <Container isFocused={isFocused} isErrored={!!error}>
        {iconLeft ? (
          <TouchableOpacity onPress={onPressLeftIcon}>
            <Icon
              name={iconLeft}
              size={20}
              color={isFocused ? colors.primary : colors.medium}
            />
          </TouchableOpacity>
        ) : null}
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={colors.mediumTint}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value
          }}
          {...rest}
        />
        {iconRight ? (
          <TouchableOpacity onPress={onPressRightIcon}>
            <Icon
              name={iconRight}
              size={20}
              color={isFocused ? colors.primary : colors.medium}
            />
          </TouchableOpacity>
        ) : null}
      </Container>
      {caption ? <Caption>{caption}</Caption> : null}
    </>
  )
}

export default forwardRef(Input)
