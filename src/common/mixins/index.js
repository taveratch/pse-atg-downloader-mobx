/*eslint no-unused-vars: "off"*/
import { css } from 'styled-components'

export const screen = {
  xs: 767,
  sm: 991,
  md: 1199
}

export const media = Object.keys(screen).reduce((media, size) => {
  media[size] = (...args) => css`
		@media (max-width: ${screen[size]}px) {
			${css(...args)}
		}
	`

  return media
}, {})

export const ratioImage = (ratio, url = null) => css`
		width: 100%;
		padding-bottom: ${100 / ratio}%;
		${ url && `background-image: url(${url})`};
	`

export const grid = {
  gutterWidth: 16
}

export const colors = {
  black: '#1d1d1d',
  white: '#ffffff',
  blue: '#0070A8',
  gray900: '#212121',
  gray800: '#424242',
  gray700: '#616161',
  gray600: '#757575',
  gray500: '#9e9e9e',
  gray400: '#bdbdbd',
  gray300: '#e0e0e0',
  gray200: '#eeeeee',
  gray100: '#f5f5f5',
  gray50: '#fafafa',
  focused: '#64B5F6',
  green: '#47C1BF',
  red: '#F44336',
  orangeAccent: '#FF672B',
  cookingAccent: '#f2c212',
  error: '#e21a00',
}

export const fontSizes = {
  large4: '28px',
  large3: '24px',
  large2: '20px',
  large1: '18px',
  normal: '16px',
  small1: '14px',
  small2: '12px',
  small3: '10px',
  small4: '8px'
}

export const lineHeights = {
  large5: '44px',
  large4: '40px',
  large3: '36px',
  large2: '32px',
  large1: '28px',
  normal: '24px',
  small1: '20px',
  small2: '16px',
  small3: '14px'
}

export const spaces = {
  large5: `${grid.gutterWidth * 4}px`,
  large4: `${grid.gutterWidth * 3}px`,
  large3: `${grid.gutterWidth * 2}px`,
  large2: `${grid.gutterWidth * 1.5}px`,
  large1: `${grid.gutterWidth}px`,
  normal: `${grid.gutterWidth / 2}px`,
  small1: `${grid.gutterWidth / 4}px`,
  small2: `${grid.gutterWidth / 8}px`,
  small3: '1px'
}

export const fontFamilies = {
  default: 'Thonburi'
}

export const fontStyle = css`
	font-style: normal;
	font-stretch: normal;
	letter-spacing: -0.1px;
`

const errorBorder = ({ validationMessage }) => validationMessage ? `solid 1px ${colors.error}` : 'none'

const getTextboxFontSize = ({ heading }) => heading ? fontSizes.large2 : fontSizes.normal

const getTextboxFontWeight = ({ heading }) => heading ? 'bold' : 'normal'

const getButtonWidth = (props) => props => props.responsive ? '100%' : 'auto'

const getButtonPadding = (props) => {
  if (props.slim) {
    return '4px 15px'
  }
  if (props.large) {
    return '12px 44px'
  }
  return '9px 15px'
}

const getDisabledButtonColor = (props) => colors[props.disabledColor] || colors.gray300

const getButtonTextColor = (props) => {
  if (props.disabled) {
    return getDisabledButtonColor(props)
  }

  return colors[props.color] || colors.gray600
}

const getButtonBorderColor = (props) => {
  if (props.disabled) {
    return getDisabledButtonColor(props)
  }

  return colors[props.color] || colors.gray400
}

export const input = css`
		background-color: ${colors.gray100};
		border: ${errorBorder} !important;
		outline: none;
		color: ${colors.black};
`

export const textbox = css`
	${input}
	${fontStyle}
	font-family: ${fontFamilies.default};
	font-size: ${getTextboxFontSize} !important;
	font-weight: ${getTextboxFontWeight} !important;
	width: 100%;
	padding: 6px 9px;

	&::placeholder {
		color: ${colors.gray400};
	}
`

export const button = css`
	${fontStyle}
	width: ${getButtonWidth};
	padding: ${getButtonPadding};
	border-radius: 4px;
	font-family: ${fontFamilies.default};
	font-size: ${fontSizes.normal};
	line-height: 20px !important;
	text-align: center;
	outline: none;
	cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
	background-color: ${colors.white};
	border: solid 1px ${getButtonBorderColor};
	color: ${getButtonTextColor};
`

export const counter = css`
	${fontStyle}
	font-family: ${fontFamilies.default};
	font-size: ${fontSizes.small2};
	text-align: right;
	color: ${colors.gray400};
`

export const expandOnMobile = css`
	${media.sm`
		${props => props.expandOnMobile ? `
			margin-left: -${spaces.normal};
			margin-right: -${spaces.normal};
			width: calc(100% + ${spaces.large1});
		` : null}
	`};
`

export const ellipsisPlaceholder = css`
	&[placeholder] {
		text-overflow: ellipsis;
	}
`

export const formInputStyle = css `
	width: 100%;
	padding: 8px 10px;
	height: 36px;
	&::placeholder {
		color: #aaa;
	}
`

export const formTextAreaStyle = css `
	${formInputStyle};
	height: 100px;
`
