import {
  Btn
} from './SquareBtn.styles'

const SquareBtn = ({text, color, onClick}) => {
  return (
    <Btn
      style={{
        backgroundColor: color
      }}
      onClick={onClick}
    >
      {text}
    </Btn>
  )
}

export default SquareBtn;