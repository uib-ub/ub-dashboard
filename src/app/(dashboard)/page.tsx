import { Button } from '@/components/ui/button';


export default async function Home() {
  return (
    <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12'>
      <h1 className='mb-3'>UB dashboard</h1>
      <p className='text-3xl font-bold leading-tight'>
        Hei hei, dette er den nye versjonen av UB dashboard. Det er en nedstrippet utgave, som fokuserer på det som er viktigst; det ToS registrerer 😊.
      </p>
      <Button size={'lg'} variant={'secondary'} className='mt-8 font-bold text-2xl p-8'>
        <a href='https://ub-dashboard-old.vercel.app'>Gå til den gamle siden</a>
      </Button>

    </div>
  )
}
