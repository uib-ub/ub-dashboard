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
import { CustomPortableText } from '@/components/custom-protable-text'
import { ScrollArea } from '@/components/ui/scroll-area'
import Timeline from '@/components/timeline'

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
  "active": "Aktiv",
  !defined(timespan) => {
    "active": "Ukjent" 
  },
  timespan.endOfTheEnd != '' && timespan.endOfTheEnd <= now() => {
    "active": "Avsluttet" 
  },
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
  "mentions": *[references($id) && _type in ['Software', 'VolatileSoftware', 'Product', 'Project', 'Group']] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "type": _type,
    label,
  },
  "memberOf": *[_type in ['Group'] && references(^._id)] | order(label) {
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
    "active": "Aktiv",
    !defined(timespan) => {
      "active": "Ukjent" 
    },
    timespan.endOfTheEnd != '' && timespan.endOfTheEnd <= now() => {
      "active": "Avsluttet" 
    },
  },
  "timeline": [
    ...*[_type in ['Event', 'Activity', 'Move', 'Joining', 'Leaving', 'TransferOfMember', 'BeginningOfExistence', 'EndOfExistence', 'Formation', 'Dissolution'] && references($id) && defined(timespan)] {
      "id": _id,
      "label": coalesce(label, 'Uten label'),
      "period": timespan.edtf,
      "timestamp": coalesce(
        select(
          timespan.date != "" => timespan.date
        ), 
        select(
          timespan.beginOfTheBegin != "" => timespan.beginOfTheBegin
        )
      )
    },
    ...*[_type in ['Project', 'Group'] && references($id) && defined(timespan.endOfTheEnd)] {
        ...select(defined(timespan.endOfTheEnd) => {
          "id": _id,
          "type": _type,
          "label": label + " avsluttes",
          "period": timespan.edtf,
          "timestamp": timespan.endOfTheEnd,
        }
      )
    },
    ...*[_type in ['Project', 'Group'] && references($id) && defined(timespan.beginOfTheBegin)] {
        ...select(defined(timespan.beginOfTheBegin) => {
          "id": _id,
          "type": _type,
          "label": label + " starter",
          "period": timespan.edtf,
          "timestamp": timespan.beginOfTheBegin,
        }
      )
    }
  ]
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

      <Tabs orientation='vertical' defaultValue="general" className="flex gap-4 flex-grow">
        <div>
          <TabsList className='flex flex-col justify-start items-start h-fit mt-2 p-2'>
            <TabsTrigger value="general">Generelt</TabsTrigger>
            <TabsTrigger value="skills">Kompetanse</TabsTrigger>
            <TabsTrigger value="responsibleFor">Ansvar</TabsTrigger>
            <TabsTrigger value="timeline">Tidslinje</TabsTrigger>
          </TabsList>
          <EditIntentButton variant={'link'} id={data.id} className='p-0 m-0 px-3 text-sm font-medium' />
        </div>

        <TabsContent value="general" className='flex-1 p-4 border rounded-sm'>
          <div className='flex flex-col gap-3'>
            {/* @ts-ignore */}
            {data.referredToBy?.[0]?.body ? (
              <>
                <h2>Beskrivelse</h2>
                <ScrollArea className="max-h-[250px] max-w-prose rounded-md border p-4 mb-5">
                  {/* @ts-ignore */}
                  <CustomPortableText value={data.referredToBy[0].body} paragraphClasses='py-2 max-w-xl' />
                </ScrollArea>
              </>
            ) : (
              null
            )}
            <MemberOf data={data.memberOf} />
          </div>
        </TabsContent>

        <TabsContent value="skills" className='flex-1 p-4 border rounded-sm'>
          <Skills data={data.hasSkill} />
        </TabsContent>

        <TabsContent value="responsibleFor" className='flex-1 p-4 border rounded-sm'>
          <ResponsibleFor data={data.currentOrFormerManagerOf} />
        </TabsContent>

        <TabsContent value="timeline" className='flex-1 p-4 border rounded-sm'>
          <div className='flex flex-col gap-2'>
            <h2>Tidslinje</h2>
            <Timeline data={data.timeline} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Person