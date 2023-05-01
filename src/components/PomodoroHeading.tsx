interface Props {
  text: string
}

export const PomodoroHeading = (props: Props) => {
  return <h1>{props.text}</h1>
}
