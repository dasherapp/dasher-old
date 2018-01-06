import React from 'react'
import Fuse from 'fuse.js'

import getAllRepositories from '../utils/getAllRepositories'
import Select from './Select'

class RepositorySelect extends React.Component {
  state = { repositories: [] }

  async componentDidMount() {
    this.setState({ repositories: await getAllRepositories() })
  }

  getItems = value => {
    const { repositories } = this.state

    if (!value) {
      return repositories.map(this.repositoryToString)
    }

    const options = {
      threshold: 0.3,
      keys: ['nameWithOwner'],
    }
    const fuse = new Fuse(repositories, options)
    return fuse.search(value).map(this.repositoryToString)
  }

  repositoryToString = repository => repository.nameWithOwner

  render() {
    return (
      <Select
        getItems={this.getItems}
        selectedItem={this.props.value}
        onChange={this.props.onChange}
      />
    )
  }
}

export default RepositorySelect
