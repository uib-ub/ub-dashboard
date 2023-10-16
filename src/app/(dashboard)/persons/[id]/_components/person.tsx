import ImageBox from '@/components/image-box'
import { QuoteIcon } from '@radix-ui/react-icons'
import { SanityDocument, SanityImageAssetDocument, groq } from 'next-sanity'
import { PortableTextBlock } from 'sanity'
import { Skills } from './skills'
import { MemberOf } from './member-of'

export const query = groq`*[_id == $id][0] {
  "id": _id,
  "type": _type,
  "label": label,
  hasType[]-> {
    "id": _id,
    label
  },
  shortDescription,
  quote,
  image,
  "period": timespan.edtf,
  referredToBy[],
  "hasSkill": hasSkill[] | order(level desc) {
    "label": competence->.label,
    level,
    shortDescription,
  },
  "currentOrFormerManagerOf": *[$id in currentOrFormerManager[].assignedActor._ref]{
    "id": _id,
    "type": _type,
    label,
    "timespan": timespan.edtf,
  },
  "mentions": *[references($id) && _type in ['Software', 'VolatileSoftware', 'Product', 'Project', 'Team', 'Group']] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "type": _type,
    label,
  },
  "memberOf": *[_type in ['Group', 'Team'] && references(^._id)] | order(label) {
    "id": _id,
    label,
    hasType[]-> {
      "id": _id,
      label
    },
    hasMember[assignedActor._ref == $id] {
      assignedRole[]-> {
        "id": _id,
        label,
      },
      "timespan": timespan.edtf,
      defined(timespan.endOfTheEnd) == true => {
        "retired": true 
      }
    },
    "timespan": timespan.edtf,
    "active": false,
    timespan.endOfTheEnd <= now() => {
      "active": true 
    }
  },  
}`

export interface PersonProps extends SanityDocument {
  id: string
  type: string
  label: string
  hasType: {
    id: string
    label: string
  }[]
  quote: string
  image: SanityImageAssetDocument
  shortDescription: string
  period: string
  referredToBy: PortableTextBlock[]
  hasSkill: {
    label: string
    level: number
    shortDescription: string
  }[]
  currentOrFormerManagerOf: {
    id: string
    type: string
    label: string
    timespan: string
  }[]
  mentions: {
    id: string
    type: string
    label: string
  }[]
  memberOf: {
    id: string
    label: string
    hasType: {
      id: string
      label: string
    }[]
    hasMember: {
      assignedRole: {
        id: string
        label: string
      }[]
      timespan: string
      retired: boolean
    }[]
    timespan: string
    active: boolean
  }[]
}

const Person = ({ data = {} }: { data: Partial<PersonProps> }) => {
  return (
    <div>
      <div className="flex flex-row gap-3 border-b pb-4">
        {data?.image ? (
          <div className='w-[100px] h-[100px]'>
            <ImageBox image={data.image} width={200} height={200} alt="" classesWrapper='relative aspect-[1/1]' />
          </div>
        ) : null}
        <div className='flex flex-col'>
          <h1 className='text-5xl mb-2'>{data?.label}</h1>
          {data?.shortDescription ? (<p>{data.shortDescription}</p>) : null}
          {data?.quote ? (<p className='italic'><QuoteIcon className='inline-block' /> {data.quote}</p>) : null}
        </div>
      </div>
      {data?.memberOf ? (
        <MemberOf data={data.memberOf} />
      ) : null}
      <div className='grid grid-cols-2 gap-5 py-4'>
        <div className='flex flex-col gap-3'>
        </div>
        <div>
          {data?.hasSkill ? (
            <Skills data={data.hasSkill} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Person