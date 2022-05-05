export default {
  widgets: [
    {
      name: 'document-list',
      options: {
        title: 'Recently edited',
        order: '_updatedAt desc',
        limit: 20
      },
      layout: { width: 'small' },
    },
    {
      name: 'project-users',
      layout: {
        height: 'auto'
      }
    },
    {
      name: 'project-info',
      options: {
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/uib-ub/ub-dashboard',
            category: 'Code',
          },
          {
            title: 'Website',
            value: 'https://ub-dashboard.vercel.app',
            category: 'Site',
          },
        ],
      },
    },
  ],
}
