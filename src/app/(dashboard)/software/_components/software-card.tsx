import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { HasSoftwarePart } from './software'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

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
      <CardContent className='p-2 flex flex-col flex-grow gap-2'>
        {runBy?.length > 0 ? (
          <>
            {runBy.map((r: { id: any; label: any; designatedAccessPoint: { value: any; }; providedBy: { label: any; }; type: any; }, i: number) => (
              <Card key={r.id} className='rounded-sm bg-zinc-200 dark:bg-zinc-700'>
                <CardHeader className='p-2'>
                  <CardTitle className='text-sm' >
                    {r.label}
                  </CardTitle>
                  <CardDescription>
                    {r.type}
                  </CardDescription>
                </CardHeader>

                <CardFooter className='flex justify-between border-t p-2'>
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
        ) : <div className='flex border rounded-sm align-middle justify-center text-xs py-6 px-2 bg-zinc-200 dark:bg-zinc-700'>Ikke deploy-a<br /> noe sted :-(.</div>}
      </CardContent >

      <CardFooter className='flex justify-self-end justify-between border-t border-zinc-700 p-2'>
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
      </CardHeader>

      <CardContent className='p-3'>
        {data.hostedBy ? (
          <div className='flex gap-2'>
            {data.hostedBy?.map((t, i) => (
              <ServiceBox key={i} data={t} />
            ))}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className='flex justify-between border-t p-3'>
        {data.hasType && (
          <div className='flex flex-wrap items-center gap-2'>
            {data.hasType.map((t, i) => (
              <Badge variant="secondary" className='grow-0 text-xs' key={i}>
                {t.label}
              </Badge>
            ))}
          </div>
        )}
        <Badge variant={'secondary'} className='grow-0 text-xs'>
          {data.type}
        </Badge>
      </CardFooter>
    </Card>
  )
}