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
        const languages = await api.Projects.languages(id);
        const readme = await api.RepositoryFiles.showRaw(id, 'README.md');

        if (data && readme && languages) {
          res.status(200).json({
            created_at: data.created_at,
            last_activity_at: data.last_activity_at,
            description: data.description,
            readme: readme,
            languages: Object.entries(languages).map(([k, v]) => { return k }),
            visibility: data.visibility,
            archived: data.archived,
            open_issues_count: data.open_issues_count,
            source: {
              ...data,
            }
          })
        }
      } catch (e) {
        res.status(500).json({
          message: e.response?.body
        })
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
