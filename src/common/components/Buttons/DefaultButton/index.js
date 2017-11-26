import Button from 'src/common/components/Buttons/Button'
import { colors } from 'src/common/mixins'

export default Button.extend`
    background: ${colors.white};
    border: 1px solid ${colors.green};
    color: ${colors.green};
    transition: 0.3s;
    &:hover {
      background: ${colors.green};
      color: ${colors.white};
    }
`