import React from 'react'
import { func, string } from 'prop-types'
import Fuse from 'fuse.js'

import getAllRepositories from '../utils/getAllRepositories'
import Select from './Select'

class RepositorySelect extends React.Component {
  static propTypes = {
    value: string,
    onChange: func,
  }

  static defaultProps = {
    value: '',
    onChange: () => {},
  }

  state = { repositories: [] }

  async componentDidMount() {
    // TODO: cancel async/await when component is unmounted
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
