import { ReactNode } from 'react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

export const InfoboxMissingData = ({ title, icon, children }: { title?: string, icon?: ReactNode, children: ReactNode }) => {
  return (
    <Alert>
      {icon ? icon : null}
      {title ? (<AlertTitle>{title}</AlertTitle>) : null}
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  )
}