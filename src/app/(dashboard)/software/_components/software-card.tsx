import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { HasSoftwarePart } from './software'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import ImageBox from '@/components/image-box'
import { SanityImageAssetDocument } from 'next-sanity'

const ServiceBox = ({ data }: { data: any }) => {
  const { type, label, designatedAccessPoint, runBy, componentOf } = data
  return (
    <Card className='flex flex-col rounded-sm bg-zinc-100 dark:bg-zinc-800 shadow-md justify-between'>
      <CardHeader className='p-2'>
        <CardTitle className='text-sm'>
          {label}
        </CardTitle>
        <CardDescription>
          {type}
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-2 flex flex-col flex-grow gap-2'>
        {runBy?.length > 0 ? (
          <>
            {runBy.map((r: { id: any; label: any; designatedAccessPoint: { value: any; }; providedBy: { label: any; logo: SanityImageAssetDocument; }; type: any; }, i: number) => (
              <Card key={r.id} className='rounded-sm bg-zinc-200 dark:bg-zinc-700'>
                <CardHeader className='p-2'>
                  <CardTitle className='text-sm' >
                    {r.label}
                  </CardTitle>
                  <CardDescription>
                    {r.type}
                  </CardDescription>
                </CardHeader>

                <CardFooter className='flex justify-start gap-2 border-t border-zinc-500 p-2'>
                  {r.providedBy?.logo ? (
                    <div className='w-[25px] h-[25px]'>
                      <ImageBox image={r.providedBy.logo} width={45} height={45} alt="" classesWrapper='relative aspect-[1/1]' />
                    </div>
                  ) : null}
                  {r?.designatedAccessPoint?.value ? (
                    <Link href={r.designatedAccessPoint?.value}>
                      {r.providedBy?.label}
                      <ExternalLinkIcon className='inline-block w-4 h-4 ml-1' />
                    </Link>
                  ) : r.providedBy?.label}
                </CardFooter>
              </Card>
            ))
            }
          </>
        ) : (
          <Alert variant={'destructive'}>
            <AlertTitle>Ingen tjenester</AlertTitle>
            <AlertDescription>
              {label} har ingen tjenester.
            </AlertDescription>
          </Alert>
        )}
      </CardContent >

      <CardFooter className='flex justify-start gap-2 border-t border-zinc-400 p-2'>
        {componentOf?.logo ? (
          <div className='w-[25px] h-[25px]'>
            <ImageBox image={componentOf.logo} width={45} height={45} alt="" classesWrapper='relative aspect-[1/1]' />
          </div>
        ) : null}
        {designatedAccessPoint?.value ? (
          <Link href={designatedAccessPoint?.value}>
            {componentOf.label}
            <ExternalLinkIcon className='inline-block w-4 h-4 ml-1' />
          </Link>
        ) : componentOf.label}
      </CardFooter>
    </Card >
  )
}

export const SoftwareCard = ({ data }: { data: HasSoftwarePart }) => {
  return (
    <Card className='rounded-sm bg-zinc-50 dark:bg-zinc-900'>
      <CardHeader className='p-3'>
        <CardTitle className='text-md'>
          {data.label}
        </CardTitle>
        <CardDescription>{data.type}</CardDescription>
      </CardHeader>

      <CardContent className='p-3'>
        {data.hostedBy ? (
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
            {data.hostedBy?.map((t, i) => (
              <ServiceBox key={i} data={t} />
            ))}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className='flex justify-end border-t p-3'>
        {data.hasType && (
          <div className='flex flex-wrap items-center gap-2'>
            {data.hasType.map((t, i) => (
              <Badge variant="secondary" className='grow-0 text-xs' key={i}>
                {t.label}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}