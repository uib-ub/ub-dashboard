import { EditIntentButton } from '@/components/edit-intent-button'
import ImageBox from '@/components/image-box'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExternalLinkIcon, QuoteIcon } from '@radix-ui/react-icons'
import { SanityDocument, SanityImageAssetDocument, groq } from 'next-sanity'
import { PortableTextBlock } from 'sanity'
import { Participants } from './participants'
import Link from 'next/link'
import { BiSubdirectoryRight } from 'react-icons/bi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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
    "period": timespan.edtf,
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
          <Card className='border-0 p-0'>
            <CardHeader className='p-0'>
              <CardTitle className='text-sm'>Type</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>{data.hasType.map(tag => (
              <Badge key={tag.id} variant={'outline'}>{tag.label}</Badge>
            ))}
            </CardContent>
          </Card>
        ) : null}
        {data?.period ? (
          <Card className='border-0 p-0'>
            <CardHeader className='p-0'>
              <CardTitle className='text-sm'>Periode</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>{data.period}</CardContent>
          </Card>
        ) : null}
      </div>

      <Separator className='my-3' />

      <Tabs orientation='vertical' defaultValue="members" className="flex gap-4 flex-grow">
        <div>

          <TabsList className='flex flex-col justify-start items-start h-fit mt-2 p-2'>
            <TabsTrigger value="members">Medlemmer</TabsTrigger>
            <TabsTrigger value="organization">Organisering</TabsTrigger>
            <TabsTrigger value="files">Filer</TabsTrigger>
          </TabsList>
          <EditIntentButton variant={'link'} id={data.id} className='p-0 m-0 px-3 text-sm font-medium' />
        </div>
        <TabsContent value="members" className='flex-1'>
          {data?.hasMember ? (
            <Participants data={data.hasMember} />
          ) : null}
        </TabsContent>

        <TabsContent value="organization" className='flex-1'>
          {(data.subGroupOf?.length > 0 || data.hasSubGroup) && (
            <div className='border rounded-sm p-4'>

              <h2>Organisering</h2>

              {data.subGroupOf?.length > 0 && (
                <ul className='mt-2'>
                  {data.subGroupOf.map((group: any) => (
                    <li key={group.id}>
                      <Link href={`/group/${group.id}`}>
                        {group.label}
                      </Link>
                    </li>
                  ))}
                  <ul>
                    <li>
                      <BiSubdirectoryRight className="inline-block" />
                      {data.label}
                    </li>
                    {data.hasSubGroup && (
                      <ul>
                        {data.hasSubGroup.map((group: any) => (
                          <li key={group.id} className='ml-3'>
                            <Link href={`/group/${group.id}`}>
                              <BiSubdirectoryRight className="inline-block" />
                              {group.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ul>
                </ul>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="files" className='flex-1'>
          <div className='border rounded-sm p-4'>

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
            ) : null}
          </div>


        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Group