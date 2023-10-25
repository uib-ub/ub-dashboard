import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { HasSoftwarePart } from './software'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

export const SoftwareCard = ({ data }: { data: HasSoftwarePart }) => {
  return (
    <Card className='rounded-sm bg-zinc-50 dark:bg-zinc-900'>
      <CardHeader className='p-3'>
        <CardTitle>
          {data.label}</CardTitle>
        <CardDescription>
        </CardDescription>
        <Badge variant={'secondary'} className='grow-0 text-md'>
          {data.type}
        </Badge>
      </CardHeader>
      <CardContent className='p-3'>
        {data.hostedBy ? (
          <div className='grid grid-flow-col auto-cols-max md:auto-cols-min gap-2 w-full'>
            {data.hostedBy?.map((t, i) => (
              <div key={t.id} className='flex flex-col flex-grow-0 gap-2 border p-3 bg-zinc-100 dark:bg-zinc-800 w-fit'>
                <div className='flex items-baseline gap-2'>
                  <span className='font-mono'>
                    <Link href={t.designatedAccessPoint.value}>{t.remoteName ? (
                      <span>{t.remoteName}: </span>
                    ) : null}
                      {t.componentOf.label} </Link>
                  </span>
                  <ExternalLinkIcon className='w-4 h-4' />
                </div>
                <Badge className='grow-0 text-sm' key={i}>
                  {t.type}
                </Badge>
                {t.runBy?.length > 0 ? (
                  <>
                    <span className='font-bold'>Kjører på:</span>
                    <div className='w-full bg-zinc-200 dark:bg-zinc-700 p-3'>
                      {t.runBy.map((r, i) => (
                        <div key={r.id} className='flex flex-col items-baseline gap-2'>
                          <span className='font-mono'>
                            <Link href={r.designatedAccessPoint.value}>
                              {r.label}: {r.providedBy.label} </Link>
                          </span>
                          <ExternalLinkIcon className='w-4 h-4' />
                          <Badge className='grow-0 text-sm' key={i}>
                            {r.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

      </CardContent>
      <CardFooter className='border-t p-3'>
        {data.hasType && (
          <div className='flex flex-wrap items-center gap-2'>
            {data.hasType.map((t, i) => (
              <Badge variant="secondary" className='grow-0' key={i}>
                {t.label}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}