import {
  Btn
} from './SquareBtn.styles'

interface SquareBtnProps {
  text: string;
  color: string;
  onClick: () => void;
}

const SquareBtn = ({text, color='rgba(135, 72, 243, 0.74)', onClick}:SquareBtnProps) => {
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



src/components/dutch/Participant/Participant.tsx(127,74): error TS2322: Type 'null' is not assignable to type '() => void'.
src/components/dutch/Participant/Participant.tsx(129,39): error TS2322: Type 'null' is not assignable to type 'string'.
src/components/dutch/Payment/Payment.tsx(28,19): error TS7031: Binding element 'onClick' implicitly has an 'any' type.
