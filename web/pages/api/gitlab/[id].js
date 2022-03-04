import { Gitlab } from '@gitbeaker/node'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  const api = new Gitlab({
    host: process.env.NEXT_PUBLIC_GITLAB_HOST,
    token: process.env.NEXT_PUBLIC_GITLAB_TOKEN,
  });

  switch (method) {
    case 'GET':
      // Get data from your database
      let project = await api.Projects.show(id);
      // let members = await api.ProjectMembers.all(id, { includeInherited: true });

      res.status(200).json({
        last_activity_at: project.last_activity_at,
        description: project.description,
        readme_url: project.readme_url,
        visibility: project.visibility,
        archived: project.archived,
        open_issues_count: project.open_issues_count,
        /* ...project,
        ...members */
      })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
