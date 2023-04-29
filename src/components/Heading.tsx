interface Props {
  text: string
}

export const Heading = (props: Props) => {
  return <h1>{props.text}</h1>
}
