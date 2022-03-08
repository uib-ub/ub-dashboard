import { Gitlab } from '@gitbeaker/node'

const api = new Gitlab({
  host: process.env.NEXT_PUBLIC_GITLAB_HOST,
  token: process.env.NEXT_PUBLIC_GITLAB_TOKEN,
});

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req


  switch (method) {
    case 'GET':
      // Get data from your database
      try {
        const data = await api.Projects.show(id);
        const readme = await api.RepositoryFiles.showRaw(id, 'README.md');
        if (data && readme) {
          res.status(200).json({
            last_activity_at: data.last_activity_at,
            description: data.description,
            readme: readme,
            visibility: data.visibility,
            archived: data.archived,
            open_issues_count: data.open_issues_count,
            /* ...data,
            ...members */
          })
        }
      } catch (e) {
        res.status(e.response?.statusCode).json({
          message: e.response?.body
        })
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
