import {
  Btn
} from './SquareBtn.styles'

interface SquareBtnProps {
  text: string;
  color: string;
  onClick: () => void;
}

const SquareBtn = ({text, color, onClick}:SquareBtnProps) => {
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