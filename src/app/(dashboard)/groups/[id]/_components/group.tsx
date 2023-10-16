import ImageBox from '@/components/image-box'
import { QuoteIcon } from '@radix-ui/react-icons'
import { SanityDocument, SanityImageAssetDocument, groq } from 'next-sanity'
import { PortableTextBlock } from 'sanity'

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
  link,
  hasFile[] {
    _key,
    label,
    "url": accessPoint.asset -> url,
    "extension": accessPoint.asset -> extension
  },
  subGroupOf|order(label)[]-> {
    "id": _id,
    hasType[]-> {
      "id": _id,
      label
    },
    label,
    shortDescription,
  },
  "hasSubGroup": *[_type == "Group" && ^._id in subGroupOf[]._ref]|order(label){
    "id": _id,
    hasType[]-> {
      "id": _id,
      label
    },
    label,
    shortDescription,
  },
  "mentions": *[references($id) && _type in ['Software', 'VolatileSoftware', 'Product', 'Project', 'Team', 'Group']] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "type": _type,
    label,
  },
  hasMember[] {
    assignedActor-> {
      "id": _id,
      "type": _type,
      label,
    },
    assignedRole[]-> {
      "id": _id,
      label,
    },
    "timespan": timespan.edtf,
    defined(timespan.endOfTheEnd) == true => {
      "retired": true 
    }
  }
}`

export interface GroupProps extends SanityDocument {
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
  mentions: {
    id: string
    type: string
    label: string
  }[]
}

const Group = ({ data = {} }: { data: Partial<GroupProps> }) => {
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

      <div className='grid grid-cols-2 gap-5 py-4'>

      </div>
    </div>
  )
}

export default Group