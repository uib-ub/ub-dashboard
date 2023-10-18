import ImageBox from '@/components/image-box'
import { QuoteIcon } from '@radix-ui/react-icons'
import { SanityDocument, SanityImageAssetDocument, groq } from 'next-sanity'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortableTextBlock } from 'sanity'
import { Skills } from './skills'
import { MemberOf } from './member-of'
import { Separator } from '@/components/ui/separator'
import { EditIntentButton } from '@/components/edit-intent-button'
import { ResponsibleFor } from './responsibleFor'

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
      <div className="flex flex-row gap-3">
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

      <Separator className='my-3' />

      <Tabs orientation='vertical' defaultValue="memberOf" className="flex gap-4 flex-grow">
        <div>
          <TabsList className='flex flex-col justify-start items-start h-fit mt-2 p-2'>
            <TabsTrigger value="memberOf">Medlem av</TabsTrigger>
            <TabsTrigger value="skills">Kompetanse</TabsTrigger>
            <TabsTrigger value="responsibleFor">Ansvar</TabsTrigger>
          </TabsList>
          <EditIntentButton variant={'link'} id={data.id} className='p-0 m-0 px-3 text-sm font-medium' />
        </div>

        <TabsContent value="memberOf" className='flex-1'>
          {data?.memberOf ? (
            <MemberOf data={data.memberOf} />
          ) : null}
        </TabsContent>

        <TabsContent value="skills" className='flex-1'>
          {data?.hasSkill ? (
            <Skills data={data.hasSkill} />
          ) : null}
        </TabsContent>

        <TabsContent value="responsibleFor" className='flex-1'>
          {data?.currentOrFormerManagerOf ? (
            <ResponsibleFor data={data.currentOrFormerManagerOf} />
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Person