import { Octokit } from "octokit";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
  });

  switch (method) {
    case 'GET':

      const project = await octokit.graphql(
        `query projectInfo($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            name,
            description,
            visibility,
            isArchived,
            createdAt,
            updatedAt,
            languages(last: 10) {
              edges {
                node {
                  name
                }
              }
            },
            mentionableUsers(last: 10) {
              edges {
                node {
                  name
                }
              }
            },
            readmeMain: object(expression: "main:README.md") {
              ... on Blob {
                text
              }
            },
            readmeMaster: object(expression: "master:README.md") {
              ... on Blob {
                text
              }
            },
          }
        }`,
        {
          owner: id[0],
          repo: id[1]
        }
      )

      res.status(200).json({
        created_at: project.repository.createdAt,
        last_activity_at: project.repository.updatedAt,
        description: project.repository.description,
        visibility: project.repository.visibility,
        archived: project.repository.isArchived,
        languages: project.repository.languages.edges?.length > 0
          ? project.repository.languages.edges.map(lang => (
            lang.node.name
          ))
          : undefined,
        users: project.repository.mentionableUsers.edges?.length > 0
          ? project.repository.mentionableUsers.edges.map(lang => (
            lang.node.name
          ))
          : undefined,
        readme: project.repository.readmeMain?.text ?? project.repository.readmeMaster?.text
      })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
