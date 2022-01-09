// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Innhold')
    .items([
      S.documentTypeListItem('Project'),
      S.documentTypeListItem('Product'),
      S.documentTypeListItem('Service'),
      S.documentTypeListItem('Dataset'),
      S.documentTypeListItem('Endpoint'),
      S.divider(),
      S.documentTypeListItem('Actor'),
      S.documentTypeListItem('Group'),
      S.divider(),
      S.listItem()
        .title('Autoriteter')
        .child(
          S.list()
            // Sets a title for our new list
            .title('Autoriteter')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Emner')
                .child(
                  S.documentTypeList('Concept')
                ),
              S.listItem()
                .title('Språk')
                .child(
                  S.documentTypeList('Language')
                ),
              S.listItem()
                .title('Programvare')
                .child(
                  S.documentTypeList('Software')
                ),
              S.listItem()
                .title('Plattform')
                .child(
                  S.documentTypeList('Platform')
                ),
              S.listItem()
                .title('Rolle')
                .child(
                  S.documentTypeList('Role')
                ),
              S.listItem()
                .title('Sted')
                .child(
                  S.documentTypeList('Place')
                ),
            ])),
      S.divider(),
      S.listItem()
        .title('Hendelser og aktiviteter')
        .child(
          S.list()
            // Sets a title for our new list
            .title('Hendelser og aktiviteter')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Hendelser')
                .child(
                  S.documentTypeList('Event')
                ),
              S.listItem()
                .title('Aktivitet (generisk)')
                .child(
                  S.documentTypeList('Activity')
                ),
              S.listItem()
                .title('Opprettelse')
                .child(
                  S.documentTypeList('Formation')
                ),
              S.listItem()
                .title('Nedleggelse')
                .child(
                  S.documentTypeList('Dissolution')
                ),
              S.listItem()
                .title('Innlemmelse')
                .child(
                  S.documentTypeList('Joining')
                ),
              S.listItem()
                .title('Utmeldelse')
                .child(
                  S.documentTypeList('Leaving')
                ),
              S.listItem()
                .title('Start på tilværelse')
                .child(
                  S.documentTypeList('BeginningOfExistence')
                ),
              S.listItem()
                .title('Slutt på tilværelse')
                .child(
                  S.documentTypeList('EndOfExistence')
                ),
              S.listItem()
                .title('Fødsel')
                .child(
                  S.documentTypeList('Birth')
                ),
              S.listItem()
                .title('Død')
                .child(
                  S.documentTypeList('Death')
                )
            ])
        ),
      // We also need to remove the new singletons from the main list
      ...S.documentTypeListItems().filter(listItem => !['Endpoint', 'Actor', 'Group', 'Place', 'Platform', 'Dataset', 'Role', 'Concept', 'Software', 'Language', 'media.tag', 'Activity', 'Event', 'Formation', 'Dissolution', 'Joining', 'Leaving', 'BeginningOfExistence', 'EndOfExistence', 'Birth', 'Death', 'Product', 'Project', 'Service'].includes(listItem.getId()))
    ])