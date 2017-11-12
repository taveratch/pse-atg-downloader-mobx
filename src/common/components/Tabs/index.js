/*eslint no-unused-vars: "off"*/
import { colors, spaces } from 'src/common/mixins'
import styled, { css } from 'styled-components'

import React from 'react'

function computeTabRange(tab) {
  const tabLeft = tab.offsetLeft
  const tabWidth = tab.offsetWidth
  const tabRight = tabLeft + tabWidth

  return [tabLeft, tabRight]
}

function computeContainerRange(container) {
  const containerVisibleWidth = container.offsetWidth
  const containerOverflowLeft = container.scrollLeft

  return [
    containerOverflowLeft + container.offsetLeft,
    containerOverflowLeft + container.offsetLeft + containerVisibleWidth
  ]
}

function isWholeTabVisible(containerRange, tabRange) {
  return tabRange[0] >= containerRange[0] && tabRange[1] <= containerRange[1]
}

function computeScrollLeft(container, tab) {
  const tabRange = computeTabRange(tab)
  const containerRange = computeContainerRange(container)

  if (!isWholeTabVisible(containerRange, tabRange)) {
    if (tabRange[1] > containerRange[1]) {
      return container.scrollLeft + (tabRange[1] - containerRange[1])
    } else if (tabRange[0] < containerRange[0]) {
      return container.scrollLeft - (containerRange[0] - tabRange[0])
    }
  } else {
    return container.scrollLeft
  }
}

const fixToTop = css`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
	height: 44px;
	padding: 0 ${spaces.normal};
	box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.25);
`

const StyledTab = styled.div`
	background: ${colors.white};
	height: 53px;
	${props => props.shouldFixTab ? fixToTop : ''}
	${props => props.tabStyle}
	ul {
		display: flex;
		margin: 0;
		padding: 0 0 16px;
		margin: ${spaces.normal} 0px;
		overflow: auto;

		> .tab:not(:first-child) {
			margin-left: ${spaces.large1};
		}

		${props => props.shouldFixTab ? css`
				border-bottom: none;
				margin: 0;
		` : ''}
}
`

const active = css`
	color: ${colors.gray700};
	border-bottom: 3px solid ${colors.blue};
`

const StyledList = styled.li`
	flex: 0 0 0;
	display: inline-flex;
	list-style: none;
	padding-top: ${spaces.normal};
	padding-bottom: ${spaces.normal};
	color: ${colors.gray500};
	white-space: nowrap;
	cursor: pointer;
	padding-left: ${spaces.normal};
	padding-right: ${spaces.normal};
	${props => props.listStyle}
	${props => props.active ? props.activeStyle ? props.activeStyle : active : ''}
`

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props)
    this.tabContainer = null
    this.tabRefs = {}
    this.ticking = false
  }

  componentDidMount() {
    this.ensureSelectedTabVisible()
  }

  componentDidUpdate(prevProps) {
    this.ensureSelectedTabVisible()
  }

  onClick = index => e => {
    this.props.onSelectTab(index)
  };

  ensureSelectedTabVisible() {
    const { selectedIndex } = this.props

    const prevTab = this.tabRefs[selectedIndex - 1]
    const currentTab = this.tabRefs[selectedIndex]
    const nextTab = this.tabRefs[selectedIndex + 1]

    if (prevTab && currentTab && nextTab) {
      const tRange = computeTabRange(currentTab)
      const cRange = computeContainerRange(this.tabContainer)

      const leftSpace = tRange[0] - cRange[0]
      const rightSpace = cRange[1] - tRange[1]

      const preferedSpace = (leftSpace + rightSpace) / 2
      const deltaLeft = tRange[0] - preferedSpace

      if (leftSpace < rightSpace) {
        this.tabContainer.scrollLeft -= Math.abs(deltaLeft)
      } else if (leftSpace > rightSpace) {
        this.tabContainer.scrollLeft += Math.abs(deltaLeft)
      }
    } else {
      this.tabContainer.scrollLeft = computeScrollLeft(this.tabContainer, currentTab)
    }
  }

  boundingRect() {
    return this.tabContainer.getBoundingClientRect()
  }

  render() {
    const { selectedIndex } = this.props

    return (
      <StyledTab
        {...this.props}
      >
        <ul ref={el => (this.tabContainer = el)}>
          {this.props.tabTitles.map((title, tabIndex) => (
            <StyledList
              {...this.props}
              ref={el => (this.tabRefs[tabIndex] = el)}
              key={tabIndex}
              active={selectedIndex === Number(tabIndex)}
              onClick={this.onClick(tabIndex)}
            >
              {title}
            </StyledList>
          ))}
        </ul>
      </StyledTab>
    )
  }
}

export default Tabs
