import { initialState } from '../contexts/TimerContext/initialState'

export interface FormErrorProps {
  errorField: FormInputType
  errorType: FormsError
}

export type FormInputType = 'email' | 'password' | 'confirmedPassword' | 'username'

export interface FormInputWrapper {
  type: FormInputType
}

export type FormsError =
  | 'none'
  | 'empty'
  | 'invalid'
  | 'exists'
  | 'invalidLength'
  | 'uppercaseRequired'
  | 'lowercaseRequired'
  | 'mismatch'
  | 'specialCharRequired'

interface FormErrorsObj {
  hasError: boolean
  currentError: FormsError
}

interface EmailErrorObj extends FormErrorsObj {
  errorTypes: {
    empty: string
    invalid: string
    exists: string
    none: null
  }
}

interface UsernameErrorObj extends FormErrorsObj {
  errorTypes: {
    empty: string
    invalid: string
    exists: string
    none: null
  }
}

interface PasswordErrorObj extends FormErrorsObj {
  errorTypes: {
    empty: string
    invalidLength: string
    uppercaseRequired: string
    lowercaseRequired: string
    specialCharRequired: string
    none: null
  }
}

interface ConfirmedPasswordErrorObj extends FormErrorsObj {
  errorTypes: {
    empty: string
    mismatch: string
    none: null
  }
}

export interface FormState {
  email: EmailErrorObj
  username: UsernameErrorObj
  password: PasswordErrorObj
  confirmedPassword: ConfirmedPasswordErrorObj
}

export interface FormContextType {
  formState: FormState
  formDispatch: React.Dispatch<FormReducerAction>
}

export interface FormReducerAction {
  type: FormContextTypes
  payload: {
    setHasError: boolean
    setCurrentError: FormsError
  }
}

export type FormReducer = (state: FormState, action: FormReducerAction) => FormState

export type FormContextTypes =
  | 'SET_EMAIL_ERROR'
  | 'SET_USERNAME_ERROR'
  | 'SET_PASSWORD_ERROR'
  | 'SET_CONFIRMED_PASSWORD_ERROR'

export interface TimerContextType {
  timeState: TimerState
  timeDispatch: React.Dispatch<TimerReducerAction>
}

export type TimerReducer = (state: TimerState, action: TimerReducerAction) => TimerState

export type TimerState = typeof initialState

export interface TimerReducerAction {
  type: TimerActionTypes
  payload?: number | boolean
}

export type TimerActionTypes =
  | 'SET_POMODORO_TIME'
  | 'SET_SHORT_TIME'
  | 'SET_LONG_TIME'
  | 'DECREASE_TIME'
  | 'SET_TIME_COUNTING'
  | 'SET_TIME_ON_DISPLAY'
  | 'SET_CYCLES_TEMP'
  | 'SET_CYCLES_FINISHED'
  | 'SET_WORKED_TIME'
  | 'RESET_ALL'
  | 'CONFIG_POMODORO_TIME'
  | 'CONFIG_SHORT_TIME'
  | 'CONFIG_LONG_TIME'
  | 'CONFIG_CYCLES'

export type ButtonsReducer = (state: ButtonsState, action: ButtonsReducerAction) => ButtonsState

export interface ButtonContextType {
  buttonState: ButtonsState
  buttonDispatch: React.Dispatch<ButtonsReducerAction>
}

export type ButtonsActionTypes = 'POMODORO' | 'SHORT' | 'LONG' | 'CLICKED'

export interface ButtonsReducerAction {
  type: ButtonsActionTypes
  payload?: boolean
}

export interface ButtonsState {
  pomodoro: boolean
  short: boolean
  long: boolean
  wasClicked: boolean
  [key: string]: boolean
}

export interface CustomizationContextState {
  background: string
  blur: string
  bright: string
  sound: SoundObject
  volume: string
  mainColor: string
  secundaryColor: string
}

export type CustomizationReducer = (
  state: CustomizationContextState,
  action: { type: CustomizationActionTypes; payload: string | SoundObject }
) => CustomizationContextState

export type CustomizationActionTypes =
  | 'CHANGE_BACKGROUND'
  | 'CHANGE_BLUR'
  | 'CHANGE_BRIGHT'
  | 'CHANGE_SOUND'
  | 'CHANGE_VOLUME'
  | 'CHANGE_MAIN_COLOR'
  | 'CHANGE_SECUNDARY_COLOR'

export interface SoundObject {
  name: string
  start: string
  end: string
}

export type Id = 'pomodoro' | 'short' | 'long' | 'cycles'

export interface MainContainerProps {
  background: string
  blur: string
  bright: string
}

export interface ReactChildrenProps {
  children: React.ReactNode
}

export interface FormInputProps {
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  IconHandleClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  id: FormInputType
  clearText: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export interface PasswordInputProps extends FormInputProps {
  setPasswordValue: (value: string) => void
  confirmedPasswordValue: string
}

export interface ConfirmedPasswordInputProps extends FormInputProps {
  passwordValue: string
  setConfirmedPasswordValue: (value: string) => void
}

export interface ColorStyleProps {
  colors: {
    mainColor: string
    secundaryColor: string
  }
}

export interface SpinnerProps {
  mainColor: string
}

export interface OptionsBtnProps {
  text: Id
}

export interface StyledButtonProps {
  isSelected?: boolean
}

export interface CounterResetBtnProps {
  animate: boolean
}

export interface DetailsProps {
  text: string
}

export interface BackgroundFilterProps {
  shouldDisplay: boolean
}

export interface GearIconProps {
  shouldRotate: boolean
  animate: boolean
}

export interface LimitValuesProps {
  id: Id
}

export interface TimerConfigInputProps {
  id: Id
  state: string
  setState: (value: string) => void
}

export interface ArrowsProps {
  state: string
  setState: (value: string) => void
  id: Id
}

export interface ConfigWindowProps {
  setShouldDisplay: (shouldDisplay: boolean) => void
  shouldDisplay: boolean
  gear: HTMLElement
}

export interface StyledConfingWindow {
  shouldDisplay: boolean
}

export interface MobileColorPickerProps {
  mainColorIsChecked: boolean
  secundaryColorIsChecked: boolean
}

export interface ColorPickerProp extends MobileColorPickerProps {
  color: string
}

export interface ColorCheckBoxProps {
  setMainColorIsChecked: (value: boolean) => void
  setSecundaryColorIsChecked: (value: boolean) => void
  mainColorIsChecked: boolean
  secundaryColorIsChecked: boolean
  id: 'main-color' | 'secundary-color'
}

export interface BackgroundOptionProps {
  background: {
    path: string
    name: string
  }
}

export interface SetAudioBtnProps {
  sounds: SoundObject
}

export interface StyledSoundButtonProps {
  isSelected: boolean
}

export interface SpanBarSoundProps {
  currentTime: number
  duration: number
}

export interface ProgressBarProps {
  id: 'start' | 'end'
  startSoundDuration: number
  startSoundCurrentTime: number
  endSoundDuration: number
  endSoundCurrentTime: number
}

export interface AudioOptionProps {
  sounds: {
    name: keyof SoundObject
    sounds: {
      start: keyof SoundObject
      end: keyof SoundObject
    }
  }
}

export interface ConfigNavStyledProps {
  isSelected: boolean
}

export interface ConfigNavProps {
  setOption: (option: 'timer' | 'background' | 'sounds' | 'color') => void
  option: 'timer' | 'background' | 'sounds' | 'color'
  setShouldDisplay: (shouldDisplay: boolean) => void
}

export type UseDisplayProps = (
  gear: HTMLElement,
  setShouldDisplay: (shouldDisplay: boolean) => void,
  shouldDisplay: boolean,
  optionsWindowRef: HTMLDivElement | null
) => void

export type UseSounds = (
  endSound: HTMLAudioElement,
  startSound: HTMLAudioElement
) => {
  startSoundDuration: number
  startSoundCurrentTime: number
  endSoundDuration: number
  endSoundCurrentTime: number
}
