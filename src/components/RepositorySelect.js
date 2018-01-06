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
    const options = {
      threshold: 0.4,
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'owner.login', weight: 0.3 },
      ],
    }
    const fuse = new Fuse(repositories, options)
    return fuse.search(value).map(({ owner, name }) => `${owner.login}/${name}`)
  }

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
