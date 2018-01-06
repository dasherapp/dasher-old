import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import * as fetch from 'isomorphic-fetch'

interface User {
  id: string
}

interface GithubUser {
  id: string
  name: string | null
  login: string
  avatar_url: string
}

interface EventData {
  githubCode: string
}

// read Github credentials from environment variables
const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET

export default async (event: FunctionEvent<EventData>) => {
  console.log(event)

  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    console.log('Please provide a valid client id and secret!')
    return { error: 'Github Authentication not configured correctly.' }
  }

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { githubCode } = event.data

    // get github token
    const githubToken: string = await getGithubToken(githubCode)

    // call github API to obtain user data
    const githubUser = await getGithubUser(githubToken)

    // get graphcool user by github id
    const user: User = await getGraphcoolUser(api, githubUser.id).then(
      r => r.User,
    )

    // check if graphcool user exists, and create new one if not
    let userId: string | null = null

    if (!user) {
      userId = await createGraphcoolUser(
        api,
        githubUser.id,
        githubUser.name,
        githubUser.login,
        githubUser.avatar_url,
      )
    } else {
      userId = await updateGraphcoolUser(
        api,
        user.id,
        githubUser.name,
        githubUser.login,
        githubUser.avatar_url,
      )
    }

    // generate node token for User node
    const graphcoolToken = await graphcool.generateNodeToken(userId!, 'User')

    return { data: { id: userId, graphcoolToken, githubToken } }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occured during authentication.' }
  }
}

async function getGithubToken(githubCode) {
  const endpoint = 'https://github.com/login/oauth/access_token'

  const data = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code: githubCode,
    }),
  }).then(response => response.json())

  if (data.error) {
    throw new Error(JSON.stringify(data.error))
  }

  return data.access_token
}

async function getGithubUser(githubToken: string): Promise<GithubUser> {
  const endpoint = `https://api.github.com/user?access_token=${githubToken}`
  const data = await fetch(endpoint).then(response => response.json())

  if (data.error) {
    throw new Error(JSON.stringify(data.error))
  }

  return data
}

async function getGraphcoolUser(
  api: GraphQLClient,
  githubUserId: string,
): Promise<{ User }> {
  const query = `
    query getUser($githubUserId: String!) {
      User(githubUserId: $githubUserId) {
        id
      }
    }
  `

  const variables = {
    // need to 'cast' to string, otherwise it will be seen as integer by GraphQL (because it's a number string)
    githubUserId: `${githubUserId}`,
  }

  return api.request<{ User }>(query, variables)
}

async function createGraphcoolUser(
  api: GraphQLClient,
  githubUserId: string,
  name: string | null,
  username: string,
  avatarUrl: string,
): Promise<string> {
  const mutation = `
    mutation createUser(
      $githubUserId: String!,
      $name: String,
      $username: String!,
      $avatarUrl: String!
    ) {
      createUser(
        githubUserId: $githubUserId,
        name: $name,
        username: $username,
        avatarUrl: $avatarUrl
      ) {
        id
      }
    }
  `

  const variables = {
    // need to 'cast' to string, otherwise it will be seen as integer by GraphQL (because it's a number string)
    githubUserId: `${githubUserId}`,
    name,
    username,
    avatarUrl,
  }

  return api
    .request<{ createUser: User }>(mutation, variables)
    .then(r => r.createUser.id)
}

async function updateGraphcoolUser(
  api: GraphQLClient,
  id: string,
  name: string | null,
  username: string,
  avatarUrl: string,
): Promise<string> {
  const mutation = `
    mutation updateUser(
      $id: ID!,
      $name: String,
      $username: String!,
      $avatarUrl: String!
    ) {
      updateUser(
        id: $id,
        name: $name,
        username: $username,
        avatarUrl: $avatarUrl
      ) {
        id
      }
    }
  `

  const variables = {
    id,
    name,
    username,
    avatarUrl,
  }

  return api
    .request<{ updateUser: User }>(mutation, variables)
    .then(r => r.updateUser.id)
}
