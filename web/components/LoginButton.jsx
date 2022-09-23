import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useSession, signIn, signOut } from "next-auth/react"
export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <Menu>
        <MenuButton>
          <Avatar name={session.user.name} src={session.user.image} size={'xs'} /> {session.user.name}
        </MenuButton>
        <MenuList>
          <MenuItem>
            Signed in as {session.user.email} <br />
          </MenuItem>
          <MenuItem>
            <button onClick={() => signOut()}>Sign out</button>
          </MenuItem>
        </MenuList>
      </Menu>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Logg inn</button>
    </>
  )
}