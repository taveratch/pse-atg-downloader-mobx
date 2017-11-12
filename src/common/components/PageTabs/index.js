import PropTypes from 'prop-types'
import React from 'react'
import Tabs from 'src/common/components/Tabs'
import { spaces } from 'src/common/mixins'
import styled from 'styled-components'

const StyledTabs = styled(Tabs) `
	margin: ${spaces.normal} 0px;
`

class PageTabs extends React.PureComponent {

  static propTypes = {
    onSelectTab: PropTypes.func,
    selectedIndex: PropTypes.number.isRequired,
    titles: PropTypes.array.isRequired
  }

  static defaultProps = {
    onSelectTab: () => { }
  }

  render() {
    return (
      <div>
        <StyledTabs
          shouldFixTab={false}
          onSelectTab={this.props.onSelectTab}
          selectedIndex={this.props.selectedIndex}
          tabTitles={this.props.titles}
          tabStyle={this.props.tabStyle}
          activeStyle={this.props.activeStyle}
          listStyle={this.props.listStyle}
        />
        {this.props.children && this.props.children[this.props.selectedIndex]}
      </div>
    )
  }
}

export default PageTabs
