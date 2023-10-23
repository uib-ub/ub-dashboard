import { EditIntentButton } from '@/components/edit-intent-button'
import ImageBox from '@/components/image-box'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExternalLinkIcon, QuoteIcon } from '@radix-ui/react-icons'
import { SanityDocument, SanityImageAssetDocument, groq } from 'next-sanity'
import { PortableTextBlock } from 'sanity'
import { Participants } from '../../../../components/participants'
import Link from 'next/link'
import { BiSubdirectoryRight } from 'react-icons/bi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CustomPortableText } from '@/components/custom-protable-text'
import { InfoboxMissingData } from '@/components/infobox-missing-data'
import { ScrollArea } from '@/components/ui/scroll-area'

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
  "mentions": *[references($id) && _type in ['Software', 'VolatileSoftware', 'Product', 'Project', 'Group']] | order(timespan.beginOfTheBegin asc)  {
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
    "period": timespan.edtf,
    "active": "Aktiv",
    !defined(timespan) => {
      "active": "Aktiv" 
    },
    timespan.endOfTheEnd != '' && timespan.endOfTheEnd <= now() => {
      "active": "Avsluttet" 
    },
  },
  "groups": *[_type in ['Group'] && !references('dd4c1492-5e15-4d18-a7f2-0b8b8f95964d')] | order(label asc)  {
    "id": _id,
    "type": _type,
    label,
    hasType[]-> {
      "id": _id,
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
    "subGroupOf": [...subGroupOf[]->._id][0],
    hasMember[] {
      "id": assignedActor->._id,
      "label": assignedActor->.label,
      "timespan": timespan.edtf,
      "role": assignedRole[]->label,
    },
    image,
    shortDescription,
  },
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
  hasMember: {
    assignedActor: {
      id: string
      label: string
    }
    assignedRole: {
      id: string
      label: string
    }[]
    timespan: string
    active: string
  }[]
  hasFile: {
    _key: string
    label: string
    url: string
    extension: string
  }[]
  mentions: {
    id: string
    type: string
    label: string
  }[]
}

const Group = ({ data = {} }: { data: Partial<GroupProps> }) => {
  return (
    <div>
      <div className="flex flex-row gap-3 pb-2 w-full">
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
        {data?.period ? (
          <Card className='border-0 p-0 shadow-none'>
            <CardHeader className='p-0 mb-1'>
              <CardTitle className='text-sm'>Periode</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>{data.period}</CardContent>
          </Card>
        ) : null}
        {data?.subGroupOf ? (
          <Card className='border-0 p-0 shadow-none'>
            <CardHeader className='p-0 mb-1'>
              <CardTitle className='text-sm'>Del av</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>{data.subGroupOf.map((group: any) => (
              <Badge key={group.id} variant={'secondary'} className='text-sm'>
                <Link href={`/groups/${group.id}`}>
                  {group.label}
                </Link>
              </Badge>
            ))}
            </CardContent>
          </Card>
        ) : null}
      </div>

      <Separator className='my-3' />

      <Tabs orientation='vertical' defaultValue="general" className="flex gap-4 flex-grow">
        <div>
          <TabsList className='flex flex-col justify-start items-start h-fit mt-2 p-2'>
            <TabsTrigger value="general">Generelt</TabsTrigger>
            <TabsTrigger value="organization">Organisering</TabsTrigger>
            <TabsTrigger value="files">Filer</TabsTrigger>
          </TabsList>
          <EditIntentButton variant={'link'} id={data.id} className='p-0 m-0 px-3 text-sm font-medium' />
        </div>

        <TabsContent value="general" className='flex-1 border rounded-sm p-4'>
          {/* @ts-ignore */}
          {data.referredToBy?.[0]?.body ? (<h2>Beskrivelse</h2>) : null}
          {/* @ts-ignore */}
          {data.referredToBy?.[0]?.body ? (
            <ScrollArea className="h-[250px] max-w-prose rounded-md border p-4 my-5">
              {/* @ts-ignore */}
              <CustomPortableText value={data.referredToBy[0].body} paragraphClasses='py-2 max-w-xl' />
            </ScrollArea>
          ) : null}
          <h2>Medlemmer</h2>
          <Participants data={data.hasMember} />
        </TabsContent>

        <TabsContent value="organization" className='flex-1 border rounded-sm p-4'>
          {(data.subGroupOf?.length > 0 || data.hasSubGroup) && (
            <div className='flex flex-col gap-2'>
              <h2>Organisering</h2>
              {data.subGroupOf?.length > 0 ? (
                <ul className='mt-2'>
                  {data.subGroupOf.map((group: any) => (
                    <li key={group.id}>
                      <Link className='underline underline-offset-2' href={`/group/${group.id}`}>
                        {group.label}
                      </Link>
                    </li>
                  ))}
                  <ul>
                    <li className='font-light'>
                      <BiSubdirectoryRight className="inline-block" />
                      {data.label}
                    </li>
                    {data.hasSubGroup && (
                      <ul>
                        {data.hasSubGroup.map((group: any) => (
                          <li key={group.id} className='ml-3'>
                            <Link className='underline underline-offset-2' href={`/groups/${group.id}`}>
                              <BiSubdirectoryRight className="inline-block" />
                              {group.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ul>
                </ul>
              ) : (
                <InfoboxMissingData>
                  Ingen eier enhet registrert
                </InfoboxMissingData>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="files" className='flex-1 border rounded-sm p-4'>
          <div className='flex flex-col gap-2'>
            <h2>Filer</h2>
            {data?.hasFile ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filer</TableHead>
                    <TableHead>Format</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.hasFile.map((file: any) => (
                    <TableRow key={file._key}>
                      <TableCell>
                        <Link href={file.url}>
                          {file.label}
                          <ExternalLinkIcon className='inline-block' />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>
                          {file.extension}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <InfoboxMissingData>
                Ingen filer
              </InfoboxMissingData>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Group