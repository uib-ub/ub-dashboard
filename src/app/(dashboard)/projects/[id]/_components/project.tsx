import { EditIntentButton } from '@/components/edit-intent-button'
import ImageBox from '@/components/image-box'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, QuoteIcon } from '@radix-ui/react-icons'
import { SanityDocument, SanityImageAssetDocument, groq } from 'next-sanity'
import { PortableTextBlock } from 'sanity'
import { Participants } from './participants'
import Link from 'next/link'
import { BiSubdirectoryRight } from 'react-icons/bi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import millify from 'millify'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export const query = groq`*[_id == $id][0] {
  "id": _id,
  "type": _type,
  status,
  label,
  hasType[]-> {
    "id": _id,
    label
  },
  shortDescription,
  "period": timespan.edtf,
  referredToBy[],
  logo,
  link,
  hasFile[] {
    _key,
    label,
    "url": accessPoint.asset -> url,
    "extension": accessPoint.asset -> extension
  },
  continued[] -> {
    "id": _id,
    label
  },
  continuedBy[] -> {
    "id": _id,
    label
  },
  hasTeam[] -> {
    "id": _id,
    label,
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
  },
  "identifier": identifiedBy[] {
    _type == 'Identifier' => {
      "id": _key,
      content,
      "type": hasType -> label
    }
  },
  "funding": activityStream[] -> {
    _type == 'FundingActivity' => {
    "id": _id,
    "type": _type,
      label,
      "awarder": awarder -> label,
      "amount": fundingAmount.value,
      "currency": fundingAmount.hasCurrency -> label,
      "period": timespan.edtf,
    }
  },
  carriedOutBy[] {
    assignedActor -> {
      "id": _id,
      "type": _type,
      label,
    },
      assignedRole[] -> {
        "id": _id,
        label,
      },
      "timespan": timespan.edtf,
      },
  hadParticipant[] {
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
      "timespan": timespan.edtf,
      },
  resultedIn[] -> {
    "id": _id,
    "type": _type,
    "period": timespan.edtf,
    label,
    usedService[] {
      "id": assignedService -> _id,
      "type": assignedService -> _type,
      "label": assignedService -> label,
      "period": timespan.edtf,
    }
  }
}`

export interface ProjectProps extends SanityDocument {
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

const Project = ({ data = {} }: { data: Partial<ProjectProps> }) => {
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
        {data?.continued ? (
          <Popover>
            <PopoverTrigger><ChevronLeftIcon className='w-10 h-10' /></PopoverTrigger>
            <PopoverContent>
              <p className='font-semibold italic'>
                Fortsatte
              </p>
              {data.continued.map((e: any) => (
                <Link key={e.id} href={`/projects/${e.id}`}>
                  {e.label}
                </Link>
              ))}
            </PopoverContent>
          </Popover>
        ) : null}

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

        {data?.continuedBy ? (
          <Popover>
            <PopoverTrigger className='aspect-square border'>
              <ChevronRightIcon className='w-10 h-10' />
            </PopoverTrigger>
            <PopoverContent>
              <p className='font-semibold italic'>
                Fortsatt av
              </p>
              {data.continuedBy.map((e: any) => (
                <Link key={e.id} href={`/projects/${e.id}`}>
                  {e.label}
                </Link>
              ))}
            </PopoverContent>
          </Popover>
        ) : null}
      </div>

      <Separator className='my-3' />

      <Tabs orientation='vertical' defaultValue="members" className="flex gap-4 flex-grow">
        <div>
          <TabsList className='flex flex-col justify-start items-start h-fit mt-2 p-2'>
            <TabsTrigger value="members">Medlemmer</TabsTrigger>
            <TabsTrigger value="funding">Finansiering</TabsTrigger>
            <TabsTrigger value="resources">Ressurser</TabsTrigger>
          </TabsList>
          <EditIntentButton variant={'link'} id={data.id} className='p-0 m-0 px-3 text-sm font-medium' />
        </div>

        <TabsContent value="members" className='flex-1'>
          <div className='flex flex-col gap-10 p-4 border rounded-sm'>
            {data?.carriedOutBy ? (
              <div>
                <h2>Prosjekteiere</h2>
                <Participants data={data.carriedOutBy} />
              </div>
            ) : null}
            {data?.hadParticipant ? (
              <div>
                <h2>Andre Institusjoner</h2>
                <Participants data={data.hadParticipant} />
              </div>
            ) : null}
            {data?.hasTeam ? (
              <div>
                <h2 className='mb-2'>Prosjektgrupper</h2>
                {data.hasTeam.map((team: any) => (
                  <div key={team.id}>
                    <h3 className='text-lg font-semibold'>{team.label}</h3>
                    <Participants data={team.hasMember} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value="funding" className='flex-1'>
          <div className='flex flex-col gap-3 p-4 border rounded-sm'>
            <h2>Finansiering</h2>
            {data?.funding ? (
              <>
                {data.funding.filter((obj: any) => !(obj && Object.keys(obj).length === 0)).map((f: any) => (
                  <Card key={f.id} className='p-1'>
                    <CardHeader className='px-3 pt-2 pb-0'>
                      <CardTitle className='text-sm'>{f.awarder}</CardTitle>
                    </CardHeader>
                    <CardContent className='px-3 py-1 font-extrabold text-2xl'>
                      {f.amount > 999999.99 ? millify(f.amount, { precision: 2, locales: ['no'], space: true, units: ['', '', 'MILL', 'MRD'] }) : f.amount}  {f.currency}
                    </CardContent>
                    <CardFooter className='px-3 py-0'>
                      <p>
                        {f.period}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </>
            ) : null}
          </div>
        </TabsContent>

        <TabsContent value="resources" className='flex-1'>
          <div className='flex flex-col gap-4 border rounded-sm p-4'>
            <h2>Ressurser</h2>
            <div className='flex flex-col gap-10'>
              {data?.link ? (
                <div>
                  <h3>Lenker</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lenke</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.link.map((file: any) => (
                        <TableRow key={file._key}>
                          <TableCell>
                            <Link href={file.url}>
                              {file.label}
                              <ExternalLinkIcon className='inline-block' />
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : null}
              {data?.hasFile ? (
                <div>
                  <h3>Filer</h3>
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
                </div>
              ) : null}
            </div>
          </div>


        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Project