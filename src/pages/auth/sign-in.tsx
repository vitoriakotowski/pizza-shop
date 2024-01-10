import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('We have sent an authentication link to your email.', {
        action: {
          label: 'Resend',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('The world is fallin apart.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button
          variant={'secondary'}
          asChild
          className="absolute right-8 top-8"
        >
          <Link to="/sign-up">New restaurant</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your sales through the partner dashboard!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Access dashboard
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
