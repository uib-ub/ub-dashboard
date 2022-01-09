import React from 'react'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { Link } from 'part:@sanity/base/router'
import { licenseTypes } from '../vocabularies/defaultVocabularies'
import sanityClient from 'part:@sanity/base/client'
import { array } from 'prop-types'

const client = sanityClient.withConfig({ apiVersion: '2021-03-25' })


export const hasType = {
  name: 'hasType',
  type: 'array',
  title: 'Klassifisert som',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Concept' }],
    },
  ],
  validation: (Rule) => Rule.required(),
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const sameAs = {
  name: 'sameAs',
  title: 'Samme som',
  titleEN: 'Same as',
  type: 'array',
  of: [{ type: 'url' }],
  options: {
    semanticSanity: {
      '@id': 'http://www.w3.org/2002/07/owl#sameAs',
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const editorialState = {
  name: 'editorialState',
  title: 'Status',
  titleEN: 'State',
  type: 'string',
  fieldset: 'state',
  initialValue: 'published',
  options: {
    list: [
      { title: 'Til gjennomgang', value: 'review' },
      { title: 'Publisert', value: 'published' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
}

export const accessState = {
  name: 'accessState',
  title: 'Tilgangsstatus',
  titleEN: 'Access state',
  type: 'string',
  fieldset: 'state',
  initialValue: 'open',
  options: {
    list: [
      { title: 'Privat', value: 'secret' },
      { title: 'Open', value: 'open' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
}

export const uses = {
  name: 'uses',
  title: 'Uses',
  description: 'List software og programmeringsspråk denne tjenesten benytter.',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Software' },
      { type: 'Language' },
    ]
  }],
  options: {
    semanticSanity: {
      '@type': '@id'
    }
  }
}

export const dependencies = {
  name: 'dependencies',
  title: 'Dependencies',
  description: 'Services and/or endpoints this service is dependent on.',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Service' },
      { type: 'Endpoint' },
    ]
  }],
  options: {
    semanticSanity: {
      '@type': '@id'
    }
  }
}

export const resultedIn = {
  name: 'resultedIn',
  title: 'Resulted in',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Product' },
    ]
  }],
  options: {
    semanticSanity: {
      '@type': '@id'
    }
  }
}


export const hasFile = {
  name: 'hasFile',
  title: 'Fil',
  titleEN: 'File',
  type: 'array',
  of: [
    { type: 'DigitalObject.File' },
  ],
  options: {
    semanticSanity: {
      '@type': 'list'
    }
  }
}

export const fileSingleton = {
  name: 'hasFile',
  title: 'Fil',
  titleEN: 'File',
  type: 'DigitalObject.File',
  options: {
    semanticSanity: {
      '@type': '@id'
    }
  },
}

export const image = {
  name: 'image',
  title: 'Thumbnail',
  titleEN: 'Thumbnail',
  description: (
    <span>
      Last opp eller velg et bilde. Dette er bildet som brukes som forhåndsvisning.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Upload or choose a image. This image will be used for previews.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    { type: 'DigitalObject.Image' },
  ],
  options: {
    layout: 'grid',
    semanticSanity: {
      '@type': '@json'
    }
  }
}

export const imageSingleton = {
  name: 'image',
  title: 'Thumbnail',
  titleEN: 'Thumbnail',
  description: (
    <span>
      Last opp eller velg et bilde. Dette er bildet som brukes som forhåndsvisning.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Upload or choose a image. This image will be used for previews.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#image'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'DigitalObject.Image',
  options: {
    semanticSanity: {
      '@type': '@json'
    }
  },
}

export const digitallyShownBy = {
  name: 'digitallyShownBy',
  title: 'Digitale bilder',
  titleEN: 'Digital images',
  description: 'For objekt med flere bilder, blad, versjoner eller sider av objektet. Bruk "hovedrepresentasjon" til forhåndsvisning.',
  descriptionEN: 'For objects with multiple images of pages, versions or sides of the object. Use "main representation" for thumbnail.',
  fieldset: 'representation',
  type: 'array',
  of: [
    { type: 'DigitalObject.Image' },
  ],
  options: {
    hotspot: true,
    layout: 'grid',
    semanticSanity: {
      '@type': '@json'
    }
  }
}

export const subjectOfManifest = {
  name: 'subjectOfManifest',
  title: 'Hovedmanifest',
  titleEN: 'Main manifest',
  type: 'url',
  description: (
    <span>
      Hovedmanifestet til objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#main-representation'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The main manifest of this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#main-representation'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  )
}

export const preferredIdentifier = {
  name: 'preferredIdentifier',
  title: 'Foretrukket identifikator',
  titleEN: 'Preferred identifier',
  description: (
    <span>
      Identifikatoren som er gjeldende for dette objektet. Alternative, eksterne eller ugyldige
      identifikatorer kan registreres i <i>Identifiert av </i>.{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#preferred-identifier'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Current, valid identifier for this object. Alternative, external or invalid ifentifiers can be
      add to <i>identified by</i>.{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#preferred-identifier'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'string',
  validation: (Rule) =>
    Rule.required().custom(async (prefId) => {
      const docs = await client.fetch(
        `*[preferredIdentifier == "${prefId}" && !(_id in path("drafts.**"))] { preferredIdentifier }`,
        { prefId },
      )
      return docs.length > 1 ? 'Value is not unique' : true
    }),
}

export const label = {
  name: 'label',
  title: 'Tittel',
  titleEN: 'Title',
  // description: (<span>Tittel. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  // descriptionEN: (<span>Title. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  type: 'LocaleString',
  validation: (Rule) => Rule.required(),
  options: {
    semanticSanity: {
      '@id': 'rdfs:label',
      '@container': '@language'
    }
  },
}
export const sortLabel = {
  name: 'sortLabel',
  title: 'Invertert form (sortering)',
  titleEN: 'Sort label',
  // description: (<span>Tittel. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  // descriptionEN: (<span>Title. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  type: 'string',
  options: {
    semanticSanity: {
      '@id': 'muna:sortLabel',
    }
  },
}

export const labelSingleton = {
  name: 'label',
  title: 'Tittel',
  titleEN: 'Title',
  // description: (<span>Tittel. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  // descriptionEN: (<span>Title. <Link target='blank' href={'https://muna.xyz/docs/model/properties#label'}><BsFillQuestionCircleFill /></Link></span>),
  type: 'string',
  validation: (Rule) => Rule.required(),
  options: {
    semanticSanity: {
      '@id': 'rdfs:label'
    }
  },
}

/**
 * Identified by
 * P1_is_identified_by
 */

export const identifiedBy = {
  name: 'identifiedBy',
  title: 'Identifisert av',
  titleEN: 'Identified by',
  description: 'Legg til titler, navn eller identifikatorer.',
  descriptionEN: 'Add all known titles, name or identifiers.',
  description: (
    <span>
      Gjeldende, alternative, eksterne eller ugyldige identifikatorer.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#identified-by'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Current, alternative, external or invalid ifentifiers.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#identified-by'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    { type: 'Name' },
    { type: 'Identifier' }
  ],
  options: {
    editModal: 'popup',
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
}

/**
 * License
 * dct:license
 */

export const license = {
  name: 'license',
  title: 'Lisensiering',
  titleEN: 'License',
  description: 'Velg den korrekt lisensen eller rettighetserklæringen.',
  descriptionEN: 'Choose the correct lisense or mark',
  type: 'string',
  options: {
    list: licenseTypes,
  },
  validation: (Rule) => Rule.required(),
}

export const subject = {
  name: 'subject',
  title: 'Emne',
  titleEN: 'Subject',
  description: (
    <span>
      Emneord knyttet til dette objektet. Legg til{' '}
      <Link target="blank" href={'/desk/steder'}>
        nye emneord
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#subject'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Subjects related to this object. Add{' '}
      <Link target="blank" href={'/desk/steder'}>
        new subjects
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#subject'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Concept' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const referredToBy = {
  name: 'referredToBy',
  title: 'Beskrivelse',
  titleEN: 'Description',
  description: (
    <span>
      Objektet kan ha mange beskrivelser, korte og/eller lange. Tekstene kan types for ulike
      bruksformål.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#description'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The object can have multiple descriptions of varying lengths and purposes.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#description'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    { type: 'LinguisticObject' },
  ],
  options: {
    editModal: 'fullscreen',
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const relation = {
  name: 'relation',
  title: 'Relasjon',
  titleEN: 'Relation',
  description: 'Uspesifisert relasjon til en annen ting',
  descriptionEN: 'Unspecified relation',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Actor' },
        { type: 'Event' },
        { type: 'Activity' },
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const subGroupOf = {
  name: 'subGroupOf',
  title: 'Undergruppe av',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Group' },
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const presentAt = {
  name: 'presentAt',
  title: 'Var tilstede ved',
  titleEN: 'Was present at',
  description: (
    <span>
      Dette objektet var tilstede ved en hendelse eller aktivitet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#present-at'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      This object was present at an event or activity.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#present-at'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Event' },
        { type: 'Activity' }
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const motivatedBy = {
  name: 'motivatedBy',
  title: 'Motivert av',
  titleEN: 'Motivated by',
  description: (
    <span>
      Dette objektet var tilstede ved en hendelse eller aktivitet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#motivated-by'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      This object was present at an event or activity.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#motivated-by'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Event' },
        { type: 'Activity' }
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const hasCurrentOwner = {
  name: 'hasCurrentOwner',
  title: 'Nåværende eier',
  titleEN: 'Current owner',
  description: (
    <span>
      Nåværende eier av dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#current-owner'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Current owner of this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#current-owner'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' },
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
}

export const hasFormerOrCurrentOwner = {
  name: 'hasFormerOrCurrentOwner',
  title: 'Tidligere eller nåværende eier',
  title: 'Former or current owner',
  description: (
    <span>
      Tidligere eller nåværende eier av dette objektet. Brukes også for usikkert eierskap.{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#former-or-current-owner'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Former or current owner of this object. Also used for uncertain ownership.{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#former-or-current-owner'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' },
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
}

export const composedOf = {
  name: 'composedOf',
  title: 'Består av',
  titleEN: 'Composed of',
  description: (
    <span>
      Andre identifiserte objekt som er en del av dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#composed-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Other identified madeObjects this object is composed of.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#composed-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' }
      ]
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
}

export const dissolved = {
  name: 'dissolved',
  title: 'Oppløsning',
  description: 'Group that was dissolved.',
  type: 'reference',
  to: [
    { type: 'Group' }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const formed = {
  name: 'formed',
  title: 'Opprettelse',
  description: 'Group that was formed.',
  type: 'reference',
  to: [
    { type: 'Group' }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const formedFrom = {
  name: 'formedFrom',
  title: 'Opprettet fra',
  titleEN: 'Formed from',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Group' }
      ],
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const joinedWith = {
  name: 'joinedWith',
  title: 'Innlemmet i gruppe',
  titleEN: 'Joined with',
  description: 'Group that actor(s) joined with',
  type: 'reference',
  to: [
    { type: 'Group' },
    { type: 'Project' },
    { type: 'Product' },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const joined = {
  name: 'joined',
  title: 'Innlemmet aktør(er)',
  titleEN: 'Joined',
  description: 'Actor(s) that joined this group',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' },
        { type: 'Group' },
      ]
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const separatedFrom = {
  name: 'separatedFrom',
  title: 'Forlot',
  titleEN: 'Left',
  description: 'Actor(s) that left this group',
  type: 'reference',
  to: [
    { type: 'Group' },
    { type: 'Project' },
    { type: 'Product' },
  ]
}

export const separated = {
  name: 'separated',
  title: 'Forlot',
  description: 'Actor(s) that left this group',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' }
      ],
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const birthOf = {
  name: 'birthOf',
  title: 'Døden til',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' },
      ],
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const deathOf = {
  name: 'deathOf',
  title: 'Døden til',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' },
      ],
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const broughtIntoExistence = {
  name: 'broughtIntoExistence',
  title: 'Starten på',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Project' },
        { type: 'Product' },
        { type: 'Service' },
        { type: 'Endpoint' }
      ],
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const tookOutOfExistence = {
  name: 'tookOutOfExistence',
  title: 'Slutten på',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Project' },
        { type: 'Product' },
        { type: 'Service' },
        { type: 'Endpoint' }
      ],
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  }
}

export const serviceDescription = {
  name: 'serviceDescription',
  title: 'Service description',
  type: 'url',
}

export const url = {
  name: 'url',
  title: 'Url',
  type: 'url',
}

export const homepage = {
  name: 'homepage',
  title: 'Hjemmeside',
  titleEN: 'Homepage',
  description: 'Hjemmeside til ressursen',
  descriptionEN: 'Main homepage for the resource',
  type: 'url',
}

export const link = {
  name: 'link',
  title: 'Links',
  type: 'array',
  of: [{
    type: 'WebResource'
  }]
}

export const usedService = {
  name: 'usedService',
  title: 'Benytter tjeneste',
  type: 'array',
  of: [
    { type: 'ServiceUsageAssignment' }
  ]
}

export const continued = {
  name: 'continued',
  title: 'Continued',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Project' },
      { type: 'Activity' }
    ]
  }]
}

export const continuedBy = {
  name: 'continuedBy',
  title: 'Continued by',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Project' },
      { type: 'Activity' }
    ]
  }]
}

export const servesDataset = {
  name: 'servesDataset',
  title: 'Leverer datasett',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Dataset' }
    ]
  }]
}

export const composedOfProducts = {
  name: 'composedOf',
  title: 'Består av',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Product' }
    ]
  }]
}

export const endpoint = {
  name: 'endpoint',
  title: 'Endpoints',
  description: 'Endpoint denne tjenesten eksponerer.',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Endpoint' }
    ]
  }]
}

export const usedPlatform = {
  name: 'usedPlatform',
  title: 'Used platform',
  type: 'array',
  of: [
    { type: 'PlatformUsageAssignment' }
  ]
}

export const as = {
  name: 'as',
  title: 'I rollen som',
  type: 'reference',
  to: [
    { type: 'Role' }
  ]
}

export const totalHours = {
  name: 'totalHours',
  title: 'totalHours',
  type: 'number',
}

export const subjectOf = {
  name: 'subjectOf',
  title: 'Omhandlet i',
  titleEN: 'Subject of',
  description: (
    <span>
      <strong>Eksperimentel:</strong> Tekster om dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#subject-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Texts that have this object as its main subject, both internal
      and other texts.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#subject-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'LinguisticDocument' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
}

export const depicts = {
  name: 'depicts',
  title: 'Avbilder',
  titleEN: 'Depicts',
  description: (
    <span>
      Avbildet på dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#depicts'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Depictions on this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#depicts'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Actor' },
        { type: 'Concept' }
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const represents = {
  name: 'represents',
  title: 'Representerer',
  titleEN: 'Represents',
  description: (
    <span>
      Hva dette motivet representerer.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#represents'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      What this visual image represents.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#represents'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Actor' },
        { type: 'Concept' }
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const showsVisualObject = {
  name: 'showsVisualObject',
  title: 'Viser merke eller bilde',
  titleEN: 'Shown visual item',
  description: (
    <span>
      Motiv vist på dette objectet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#shown-visual-item'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Visual item shown on this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#shown-visual-item'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'VisualObject' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const carries = {
  name: 'carries',
  title: 'Bærer verk',
  titleEN: 'Carries work',
  description: (
    <span>
      Verk som er representert i dette objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#carries'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Work represented on this object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#carries'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Work' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const measuredBy = {
  name: 'measurement',
  title: 'Måling',
  titleEN: 'Measured by',
  description: (
    <span>
      <strong>Eksperimentel:</strong> Måling av objektet.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#measurement'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Measurment of the object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#measurement'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Measurement' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const hasDimension = {
  name: 'hasDimension',
  title: 'Har dimension',
  titleEN: 'Has dimension',
  description: (
    <span>
      <strong>Eksperimentel:</strong> Objektets dimension.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#dimension'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      <strong>Experimental:</strong> Dimension of the object.{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#dimension'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'Dimension' }],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
}

export const consistsOf = {
  name: 'consistsOf',
  title: 'Laget av',
  titleEn: 'Consists of',
  description: (
    <span>
      Hvilket material objektet er laget av, for eksempel lær og/eller pergament. Legg til{' '}
      <Link target="blank" href={'/desk/typer;material'}>
        nytt material
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#consists-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The material the item is produced with, eg. leather and-or parchment. Add{' '}
      <Link target="blank" href={'/desk/typer;material'}>
        new material
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#consists-of'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Material' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@list',
      '@type': '@id'
    }
  },
}

export const usedGeneralTechnique = {
  name: 'usedGeneralTechnique',
  title: 'Brukte generell teknikk',
  titleEN: 'Used general technique',
  description: (
    <span>
      Teknikker eller metoder brukt i aktiviteten. Legg til{' '}
      <Link target="blank" href={'/desk/typer;technique'}>
        ny teknikk
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-general-technique'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The techniques or methods that was employed in an activity. Add{' '}
      <Link target="blank" href={'/desk/typer;technique'}>
        new technique
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-general-technique'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'Technique' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const usedSpecificTechnique = {
  name: 'usedSpecificTechnique',
  title: 'Brukte spesifikk teknikk',
  titleEN: 'Used spesific technique',
  description: (
    <span>
      Spesifikk teknikk brukt i aktiviteten. Legg til{' '}
      <Link target="blank" href={'/desk/samlingsadministrasjon;designOrProcedure'}>
        ny tekniskbeskrivelse
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-technique'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The spesific technique that was employed in an activity. Add{' '}
      <Link target="blank" href={'/desk/samlingsadministrasjon;designOrProcedure'}>
        new procedure
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-technique'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'DesignOrProcedure' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const usedObjectOfType = {
  name: 'usedObjectOfType',
  title: 'Brukte objekt av type',
  titleEN: 'Used object of type',
  description: (
    <span>
      Objekttype som ble brukt i aktiviteten. Legg til{' '}
      <Link target="blank" href={'/desk/typer;objectType'}>
        ny objekttype
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#used-object-of-type'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The object type that was used in an activity.. Add{' '}
      <Link target="blank" href={'/desk/typer;objectType'}>
        new object type
      </Link>
      .{' '}
      <Link target="blank" href={'https://muna.xyz/docs/model/properties#used-object-of-type'}>
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'ObjectType' }],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const usedSpecificObject = {
  name: 'usedSpecificObject',
  title: 'Brukte spesifikt objekt',
  titleEN: 'Used spesific object',
  description: (
    <span>
      Objekt som ble brukt i aktiviteten. Legg til{' '}
      <Link target="blank" href={'/desk/objekt'}>
        nytt objekt
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-object'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      The object that was used in an activity. Add a{' '}
      <Link target="blank" href={'/desk/objekt'}>
        new object
      </Link>
      .{' '}
      <Link
        target="blank"
        href={'https://muna.xyz/docs/model/properties#used-spesific-object'}
      >
        <BsFillQuestionCircleFill />
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'HumanMadeObject' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const timespan = {
  name: 'timespan',
  title: 'Tidsspenn',
  titleEN: 'Timespan',
  type: 'Timespan',
}

export const timespanSingleton = {
  name: 'timespan',
  title: 'Tidsspenn',
  titleEN: 'Timespan',
  type: 'Timespan',
}

export const contributionAssignedBy = {
  name: 'contributionAssignedBy',
  title: 'Utført av',
  titleEN: 'Contribution assigned by',
  type: 'array',
  of: [
    { type: 'ContributionAssignment' }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const carriedOutBy = {
  name: 'carriedOutBy',
  title: 'Utført av',
  titleEN: 'Carried out by',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      { type: 'Actor' },
    ]
  }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const hadParticipant = {
  name: 'hadParticipant',
  title: 'Hadde medvirkende',
  titleEN: 'Had participant',
  type: 'array',
  of: [{ type: 'ContributionAssignment' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const tookPlaceAt = {
  name: 'tookPlaceAt',
  title: 'Skjedde ved',
  titleEN: 'Took place at',
  description: (
    <span>
      Hvor skjedde dette? Legg til{' '}
      <Link target="blank" href={'/desk/steder'}>
        nytt sted
      </Link>
    </span>
  ),
  descriptionEN: (
    <span>
      Where did this happen? Add{' '}
      <Link target="blank" href={'/desk/steder'}>
        a new place
      </Link>
    </span>
  ),
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Place' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

/**
 * skos:altLabel
 */
export const altLabel = {
  name: 'altLabel',
  title: 'Alternativt navn',
  titleEN: 'Alternative label',
  type: 'LocaleString',
  options: {
    semanticSanity: {
      '@container': '@language',
    }
  },
}

/**
 * P35_has_identified
 */
export const hasIdentified = {
  name: 'hasIdentified',
  title: 'Identifiserte tilstander',
  titleEN: 'Has identified condition states',
  type: 'array',
  of: [{ type: 'ConditionState' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const valueSlider = {
  name: 'value',
  title: 'Verdi',
  titleEN: 'Value',
  description: '1 is horrible, 100 is MINT!',
  type: 'number',
  options: {
    layout: 'slider',
    range: { min: 1, max: 100, step: 1 },
  },
}

export const language = {
  name: 'language',
  title: 'Språk',
  titleEN: 'Language',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'Language' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const memberOf = {
  name: 'memberOf',
  title: 'Medlem av',
  titleEN: 'Member of',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' }
      ],
      options: {
        filter: '_type == "Actor" && references($id)',
        filterParams: { id: 'd4ad3e47-1498-4b95-9b7f-c25be386691a' }
      }
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

/**
 * hasMember
 * la:has_member
 */
export const hasMember = {
  name: 'hasMember',
  title: 'Har deler',
  titleEN: 'Has member',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'HumanMadeObject' }] }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const definedByGeoJSON = {
  name: 'definedByGeoJSON',
  title: 'GeoJSON',
  titleEN: 'GeoJSON',
  description: 'Lag et GeoJSON objekt eller lim inn en hel GeoJSON fil.',
  type: 'array',
  of: [
    { type: 'GeojsonFeatureCollection' },
    { type: 'Geojson' }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const transferredTitleTo = {
  name: 'transferredTitleTo',
  title: 'Overførte tittel til',
  titleEN: 'Transferred title to',
  description: '',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' }
      ]
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const transferredTitleFrom = {
  name: 'transferredTitleFrom',
  title: 'Overførte tittel fra',
  titleEN: 'Transferred title from',
  description: '',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'Actor' }
      ]
    }
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const transferredTitleOf = {
  name: 'transferredTitleOf',
  title: 'Overførte tittel',
  titleEN: 'Transferred title of',
  description: '',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Collection' }
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const concerned = {
  name: 'concerned',
  title: 'Omhandler',
  titleEN: 'About',
  description: 'Which collection(s) or object(s) is this an assessment of.',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        { type: 'HumanMadeObject' },
        { type: 'Collection' }
      ],
    },
  ],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const motivated = {
  name: 'motivated',
  title: 'Motiverte',
  titleEN: 'Motivated',
  type: 'array',
  of: [{ type: 'Treatment' }],
  options: {
    semanticSanity: {
      '@container': '@set',
      '@type': '@id'
    }
  },
}

export const featured = {
  name: 'featured',
  title: 'Fremhevet?',
  titleEN: 'Featured?',
  type: 'boolean',
  initialValue: false,
  options: {
    semanticSanity: {
      "@type": "xsd:boolean"
    }
  },
}

export const wasOutputOf = {
  name: 'wasOutputOf',
  title: 'Was output of',
  type: 'DataTransferEvent',
  hidden: true,
  options: {
    semanticSanity: {
      '@type': '@json'
    }
  },
}

export const inDataset = {
  name: 'inDataset',
  title: 'I datasett',
  titleEN: 'In dataset',
  type: 'Dataset',
  options: {
    semanticSanity: {
      '@type': '@id'
    }
  },
}

export const shortDescription = {
  name: 'shortDescription',
  title: 'Kort beskrivelse',
  titleEN: 'Short description',
  description: 'En setning som beskriver denne tingen. For eksempel en persons livsrolle, virkested og leveår.',
  type: 'string',
  validation: (Rule) => Rule.max(100).warning('Korte og konsise beskrivelser er best!'),
}