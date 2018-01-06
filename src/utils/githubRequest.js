import axios from 'axios'

import { GITHUB_TOKEN } from '../constants'

const githubEndpoint = 'https://api.github.com/graphql'

function githubRequest(data, config) {
  const headers = {
    Authorization: `bearer ${localStorage.getItem(GITHUB_TOKEN)}`,
  }
  return axios.post(githubEndpoint, data, { headers, ...config })
}

export default githubRequest
