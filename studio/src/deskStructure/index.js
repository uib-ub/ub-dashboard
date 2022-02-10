// /deskStructure.js
import S from '@sanity/desk-tool/structure-builder'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const getDefaultDocumentNode = () => {
  // Give all documents the JSON preview, 
  // as well as the default form view
  return S.document().views([
    S.view.form(),
    S.view.component(DocumentsPane)
      .options({
        query: `*[!(_id in path("drafts.**")) && references($id)]`,
        params: { id: `_id` },
        useDraft: false,
        debug: true,
      })
      .title('Incoming References')
  ])
}


export default () =>
  S.list()
    .title('Innhold')
    .items([
      S.documentTypeListItem('Project'),
      S.documentTypeListItem('Product'),
      S.documentTypeListItem('Software'),
      S.documentTypeListItem('Service'),
      S.documentTypeListItem('Dataset'),
      S.documentTypeListItem('Endpoint'),
      S.divider(),
      S.documentTypeListItem('Actor'),
      S.documentTypeListItem('Team'),
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
                .title('Aktivitetstyper')
                .child(
                  S.documentTypeList('ActivityType')
                ),
              S.listItem()
                .title('Hendelsestyper')
                .child(
                  S.documentTypeList('EventType')
                ),
              S.listItem()
                .title('Gruppetyper')
                .child(
                  S.documentTypeList('GroupType')
                ),
              S.listItem()
                .title('Identifikatortyper')
                .child(
                  S.documentTypeList('IdentifierType')
                ),
              S.listItem()
                .title('Navnetyper')
                .child(
                  S.documentTypeList('NameType')
                ),
              S.listItem()
                .title('Språk')
                .child(
                  S.documentTypeList('Language')
                ),
              S.listItem()
                .title('Programmeringsspråk')
                .child(
                  S.documentTypeList('ProgrammingLanguage')
                ),
              S.listItem()
                .title('Protokoll')
                .child(
                  S.documentTypeList('ProtocolType')
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
              S.listItem()
                .title('Valuta')
                .child(
                  S.documentTypeList('Currency')
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
                .title('Finansiering')
                .child(
                  S.documentTypeList('FundingActivity')
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
                .title('Overføring (personell)')
                .child(
                  S.documentTypeList('TransferOfActor')
                ),
              S.listItem()
                .title('Flytting')
                .child(
                  S.documentTypeList('Move')
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
      // ...S.documentTypeListItems().filter(listItem => !['Endpoint', 'Actor', 'Group', 'Place', 'Platform', 'Dataset', 'Role', 'Concept', 'Software', 'Language', 'media.tag', 'Activity', 'Event', 'Move', 'Formation', 'Dissolution', 'Joining', 'Leaving', 'BeginningOfExistence', 'EndOfExistence', 'Birth', 'Death', 'Product', 'Project', 'Service'].includes(listItem.getId()))
    ])