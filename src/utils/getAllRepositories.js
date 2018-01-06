import githubRequest from './githubRequest'

const repositoriesQuery = `
  query($cursor: String) {
    viewer {
      repositories(
        first: 100,
        after: $cursor,
        affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
      ) {
        totalCount
        edges {
          cursor
          node {
            nameWithOwner
          }
        }
      }
    }
  }
`

async function getAllRepositories() {
  let allRepositories = []
  let totalCount = null
  let cursor = null

  while (!totalCount || allRepositories.length < totalCount) {
    const repositories = await getRepositories(cursor).then(
      response => response.data.data.viewer.repositories,
    )

    allRepositories = allRepositories.concat(
      repositories.edges.map(edge => edge.node),
    )

    totalCount = repositories.totalCount

    cursor = repositories.edges[repositories.edges.length - 1].cursor
  }

  return allRepositories
}

function getRepositories(cursor) {
  return githubRequest({ query: repositoriesQuery, variables: { cursor } })
}

export default getAllRepositories
