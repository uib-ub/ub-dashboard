import { EditIntentButton } from '@/components/edit-intent-button'
import ImageBox from '@/components/image-box'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SanityDocument, SanityImageAssetDocument, groq } from 'next-sanity'
import { PortableTextBlock } from 'sanity'
import { Participants } from '@/components/participants'
import { CustomPortableText } from '@/components/custom-protable-text'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SoftwareCard } from './software-card'
import { path } from '@/lib/utils'
import Link from 'next/link'

export const query = groq`*[_id == $id][0] {
  "id": _id,
  "type": _type,
  label,
  hasType[]-> {
    "id": _id,
    label,
  },
  shortDescription,
  referredToBy[],
  logo,
  externalSoftware == null || externalSoftware == false => {
    "madeByUB": true,
  },
  externalSoftware == true => {
    "madeByUB": false,
  },
  currentOrFormerManager[] {
    assignedActor -> {
      "id": _id,
      "type": _type,
      label,
    },
    assignedRole[] -> {
      "id": _id,
      "type": _type,
      label,
    },
    "period": timespan.edtf,
    "active": "Aktiv",
    !defined(timespan) => {
      "active": "Ukjent" 
    },
    timespan.endOfTheEnd != '' && timespan.endOfTheEnd <= now() => {
      "active": "Avsluttet" 
    },
  },
  hasSoftwarePart[]-> {
    "id": _id,
    "type": _type,
    label,
    hasType[]-> {
      "id": _id,
      label,
    },
    runBy[]-> {
      "id": _id,
      "type": _type,
      label,
      "period": timespan.edtf,
      providedBy-> {
        "id": _id,
        "type": _type,
        label,
        logo,
      },
      accessPoints[] {
        "id": _id,
        "type": _type,
        label,
        value,
      },
      designatedAccessPoint {
        "type": _type,
        value,
      },
      runsOnRequest-> {
        "id": _id,
        "type": _type,
        label,
      },
    },
    hostedBy[]-> {
      "id": _id,
      "type": _type,
      label,
      "period": timespan.edtf,
      hasPlatformCapability,
      hasComputingCapability,
      remoteName,
      componentOf-> {
        "id": _id,
        "type": _type,
        label,
      },
      designatedAccessPoint {
        "type": _type,
        value,
      },
      "runBy": *[_type == 'SoftwareComputingEService' && references(^._id)] {
        "id": _id,
        "type": _type,
        label,
        "period": timespan.edtf,
        providedBy-> {
          "id": _id,
          "type": _type,
          label,
          logo,
        },
        accessPoints[] {
          "id": _id,
          "type": _type,
          label,
          value,
        },
        designatedAccessPoint {
          "type": _type,
          value,
        },
      }
    },
  },
  "resultOf": *[resultedIn[][0]._ref == $id][0] {
    "id": _id,
    "type": _type,
    "period": timespan.edtf,
    label,
    logo,
  }
}`

export type SoftwareComputingEService = {
  id: string
  type: string
  label: string
  period: string
  providedBy: {
    id: string
    type: string
    label: string
    logo: SanityImageAssetDocument
  }
  accessPoints: {
    id: string
    type: string
    label: string
    value: string
  }[]
  designatedAccessPoint: {
    type: string
    value: string
  }
}

export type HasSoftwarePart = {
  id: string
  type: string
  label: string
  hasType: {
    id: string
    label: string
  }[]
  runBy: SoftwareComputingEService[]
  hostedBy: {
    id: string
    type: string
    label: string
    period: string
    hasPlatformCapability: boolean
    hasComputingCapability: boolean
    remoteName: string
    componentOf: {
      id: string
      type: string
      label: string
    }
    designatedAccessPoint: {
      type: string
      value: string
    }
    runBy: SoftwareComputingEService[]
  }[]
}

export type SoftwareProps = SanityDocument & {
  id: string
  type: string
  label: string
  hasType: {
    id: string
    label: string
  }[]
  quote: string
  logo: SanityImageAssetDocument
  shortDescription: string
  period: string
  referredToBy: {
    _key: string
    _type: string
    accessState: string
    editorialState: string
    body: PortableTextBlock[]
  }[]
  currentOrFormerManager: {
    assignedActor: {
      id: string
      type: string
      label: string
    }
    assignedRole: {
      id: string
      label: string
    }[]
    period: string
    active: string
  }[]
  hasSoftwarePart: HasSoftwarePart[]
}

const Software = ({ data = {} }: { data: Partial<SoftwareProps> }) => {
  return (
    <div>
      <div className="flex flex-row gap-3 pb-2 w-full">
        {data?.logo ? (
          <div className='w-[100px] h-[100px]'>
            <ImageBox image={data.logo} width={200} height={200} alt="" classesWrapper='relative aspect-[1/1]' />
          </div>
        ) : null}
        <div className='flex flex-col'>
          <h1 className='text-5xl mb-2'>{data?.label}</h1>
          {data?.shortDescription ? (<p>{data.shortDescription}</p>) : null}
        </div>
      </div>

      <Separator className='my-3' />

      <div className='flex gap-4 w-full'>
        <div className='flex gap-4 w-full'>
          {data?.hasType ? (
            <Card className='border-0 p-0 shadow-none'>
              <CardHeader className='p-0 mb-1'>
                <CardTitle className='text-sm'>Type</CardTitle>
              </CardHeader>
              <CardContent className='p-0'>{data.hasType.map(tag => (
                <Badge key={tag.id} variant={'secondary'} className='text-sm'>{tag.label}</Badge>
              ))}
              </CardContent>
            </Card>
          ) : null}

          {data?.resultOf ? (
            <Card className='flex gap-2 border-0 p-0 shadow-none'>
              {data.resultOf?.logo ? (
                <div className='w-[45px] h-[45px]'>
                  <ImageBox image={data.resultOf?.logo} width={200} height={200} alt="" classesWrapper='relative aspect-[1/1]' />
                </div>
              ) : null}
              <div>
                <CardHeader className='p-0 mb-1'>
                  <CardTitle className='text-sm'>Resultat av: <i>{data.resultOf?.type}</i></CardTitle>
                </CardHeader>
                <CardContent className='p-0'>
                  <Link href={`/${path[data.resultOf?.type]}/${data.resultOf?.id}`} className='underline underline-offset-2'>
                    {data.resultOf?.label}
                  </Link>
                </CardContent>
              </div>
            </Card>
          ) : null}
        </div>
      </div>

      <Separator className='my-3' />

      <Tabs orientation='vertical' defaultValue="general" className="flex gap-10 flex-grow">
        <div>
          <TabsList className='flex flex-col justify-start items-start h-fit mt-2 p-2'>
            <TabsTrigger value="general">Generelt</TabsTrigger>
          </TabsList>
          <EditIntentButton variant={'link'} id={data.id} className='p-0 m-0 px-3 text-sm font-medium' />
        </div>

        <TabsContent value="general" className='flex-1 p-4 border rounded-sm'>
          {/* @ts-ignore */}
          {data.referredToBy?.[0]?.body ? (
            <>
              <h2>Beskrivelse</h2>
              <ScrollArea className="h-[250px] max-w-prose rounded-md border p-4 mt-2 mb-5">
                {/* @ts-ignore */}
                <CustomPortableText value={data.referredToBy[0].body} paragraphClasses='py-2 max-w-xl' />
              </ScrollArea>
            </>
          ) : null}

          <div className='flex flex-col gap-10'>
            {data?.currentOrFormerManager ? (
              <div>
                <h2>Ansvarlig</h2>
                <Participants data={data.currentOrFormerManager} config={{ activeFilter: false }} />
              </div>
            ) : null}

            {data?.hasSoftwarePart ? (
              <div className='flex flex-col gap-3'>
                <h2>Deler</h2>
                <div className='grid grid-cols-2 gap-4'>
                  {data?.hasSoftwarePart.map((s, i) => (
                    <SoftwareCard data={s} key={i} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Software