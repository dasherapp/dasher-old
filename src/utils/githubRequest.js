import axios from 'axios'

import { GITHUB_TOKEN } from '../constants'

const githubEndpoint = 'https://api.github.com/graphql'

const headers = {
  Authorization: `bearer ${localStorage.getItem(GITHUB_TOKEN)}`,
}

function githubRequest(data, config) {
  return axios.post(githubEndpoint, data, { headers, ...config })
}

export default githubRequest
