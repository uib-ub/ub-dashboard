import { sanityStaticProps, useSanityQuery, PortableText } from "../../lib/sanity";
import { groq } from "next-sanity";
import { Heading, Skeleton, Stack } from '@chakra-ui/react'


const myQuery = groq`*[ _type in ['Product']]{...}`;

export const getStaticProps = async (context) => ({
  props: await sanityStaticProps({ context, query: myQuery })
});


export default function ServicesPage(props) {
  const { data, loading, error } = useSanityQuery(myQuery, props);

  // Render page with data
  return (
    <>
      {loading && (
        <Stack>
          <Skeleton height='20px' />
        </Stack>
      )}
      {error && (
        <pre>{error}</pre>
      )}
      {data.map(p => (
        <Heading key={p._id}>{p?.label}</Heading>
      ))}
      {/* <PortableText blocks={data.content} /> */}
    </>
  )
}