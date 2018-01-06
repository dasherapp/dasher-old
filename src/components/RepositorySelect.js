import React from 'react'

import getAllRepositories from '../utils/getAllRepositories'
import Select from './Select'

class RepositorySelect extends React.Component {
  state = { repositories: [] }

  async componentDidMount() {
    this.setState({ repositories: await getAllRepositories() })
  }

  render() {
    return (
      <Select
        items={this.state.repositories}
        selectedItem={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
}

export default RepositorySelect
