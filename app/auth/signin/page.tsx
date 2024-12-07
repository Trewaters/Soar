import React from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import Header from "@serverComponents/header"
import Image from "next/image"
import { signIn, providerMap, signOut, auth } from "@auth"
import { AuthError } from "@node_modules/next-auth"
import { redirect } from "@node_modules/next/navigation"
import CredentialsInput from "./credentialsInput"

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  const session = await auth()
  return (
    <>
      <nav>
        <Header />
      </nav>
      <Stack flexDirection={"row"} justifySelf={"center"} alignItems={"center"}>
        <Stack>
          <Typography variant={"subtitle1"}>An Uvuyoga App</Typography>
        </Stack>
        <Stack>
          <Image
            src={"/icons/asanas/leaf-1.svg"}
            alt={"SOAR logo"}
            width={100}
            height={100}
          />
        </Stack>
      </Stack>
      <Stack justifyContent={"center"} alignItems={"center"} display={"flex"}>
        <Stack
          textAlign={"center"}
          spacing={2}
          sx={{
            my: 6,
            border: "1px solid black",
            width: "50%",
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{ pt: 4, pl: 4 }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Typography variant="h2">Welcome back!</Typography>
            <Typography variant="body1" component="p">
              We&apos;re happy you&apos;re here!
            </Typography>
          </Box>

          <Stack
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ mt: 4 }}
          >
            {/*             
// ! Remove until I can fix the following.
1) password recovery
2) do not show error page when user is not found
            <CredentialsInput /> 
            */}

            {Object.values(providerMap).map((provider, index) => (
              <form
                key={index}
                action={async () => {
                  "use server"
                  // eslint-disable-next-line no-useless-catch
                  try {
                    await signIn(provider.id, {
                      redirectTo: props.searchParams?.callbackUrl ?? "",
                    })
                    // await signIn(provider.id, {
                    // redirectTo: '/navigator/profile',
                    // })
                  } catch (error) {
                    // Signin can fail for a number of reasons, such as the user
                    // not existing, or the user not having the correct role.
                    // In some cases, you may want to redirect to a custom error
                    if (error instanceof AuthError) {
                      return redirect(
                        `${process.env.SIGNIN_ERROR_URL}?error=${error.type}`
                      )
                    }

                    // Otherwise if a redirects happens Next.js can handle it
                    // so you can just re-thrown the error and let Next.js handle it.
                    // Docs:
                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                    throw error
                  }
                }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ m: 2, borderRadius: "12px" }}
                  startIcon={
                    <Image
                      src={
                        provider.name.toLowerCase() === "google"
                          ? "/icons/profile/auth-google.svg"
                          : "/icons/profile/auth-github-mark.svg"
                      }
                      alt={provider.name}
                      width={20}
                      height={20}
                    />
                  }
                >
                  <Typography>Sign in with {provider.name}</Typography>
                </Button>
              </form>
            ))}
          </Stack>
          <Stack>
            {!session && (
              <>
                <Typography margin={1} variant="body1">
                  Don&apos;t have an account yet?
                </Typography>
                <Typography variant="body1">
                  Signing in will automatically create an account for you.
                </Typography>
              </>
            )}
          </Stack>
          {session && (
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <Button variant="contained" type="submit" sx={{ mb: 3 }}>
                Sign out
              </Button>
            </form>
          )}
        </Stack>
      </Stack>
    </>
  )
}
