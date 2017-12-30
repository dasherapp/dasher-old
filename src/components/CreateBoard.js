import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class CreateBoard extends React.Component {
  state = { name: '' }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { data } = this.props

    if (!data.user) {
      console.warn('Only logged in users can create new posts')
      return
    }

    const response = await this.props.createBoard(this.state.name, data.user.id)
    this.props.history.push(`/board/${response.data.createBoard.id}`)
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return <div>Loading</div>
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Board name
          <input
            value={this.state.name}
            onChange={this.handleNameChange}
            required
          />
        </label>
        <button type="submit">Create board</button>
      </form>
    )
  }
}

const USER = gql`
  query User {
    user {
      id
    }
  }
`

const CREATE_BOARD = gql`
  mutation CreateBoard($name: String!, $userId: ID!) {
    createBoard(name: $name, createdById: $userId) {
      id
    }
  }
`

export default compose(
  graphql(USER, { options: { fetchPolicy: 'network-only' } }),
  graphql(CREATE_BOARD, {
    props: ({ mutate }) => ({
      createBoard: (name, userId) => mutate({ variables: { name, userId } }),
    }),
  }),
  withRouter,
)(CreateBoard)
