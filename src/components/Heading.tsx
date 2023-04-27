interface Props {
  text: string
}

export const Heading = (props: Props) => {
  return <h2>{props.text}</h2>
}
