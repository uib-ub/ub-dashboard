import { Octokit } from "octokit";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
  });

  console.log(id)

  switch (method) {
    case 'GET':

      project = await octokit.graphql(
        `
        query lastIssues($owner: String!, $repo: String!, $num: Int = 3) {
          repository(owner: $owner, name: $repo) {
            issues(last: $num) {
              edges {
                node {
                  title
                }
              }
            }
          }
        }
        `,
        {
          owner: id[0],
          repo: id[1]
        }
      )
      res.status(200).json({
        /* last_activity_at: project.updated_at,
        description: project.body,
        visibility: project.state, */
        ...project,
      })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
