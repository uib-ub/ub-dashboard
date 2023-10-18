import { Button } from '@/components/ui/button';


export default async function Home() {
  return (
    <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 flex flex-col gap-10'>
      <h1>UB dashboard</h1>
      <p className='text-3xl font-bold leading-tight'>
        Hei hei, dette er den nye versjonen av UB dashboard. Det er en nedstrippet utgave, som fokuserer på det som er viktigst; det ToS registrerer 😊.
      </p>
      <p className='text-3xl font-bold leading-tight'>
        Er du her, vet du hva du kan forente deg. Skal du registrere noe finner du en lenke til <i>
          studioet</i> i menyen til høyre, den saken med initalene dine.
      </p>
      <p className='text-muted-foreground w-1/2 mx-auto'>
        Savner du den gamle versjonen? Den kan gjøre sitt comeback, men jeg orket ikke å få den gamle til å funke. Så det.
      </p>
      <p className='text-muted-foreground w-1/3 mx-auto'>
        Og ja, det er noen bugs, men <i>hei hei</i>; færre enn det var!
      </p>
    </div>
  )
}
