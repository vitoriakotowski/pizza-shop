import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Restaurant successfully registered.', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch {
      toast.error('The world is fallin apart.')
    }
  }

  return (
    <>
      <Helmet title="Registration" />
      <div className="p-8">
        <Button
          variant={'secondary'}
          asChild
          className="absolute right-8 top-8"
        >
          <Link to="/sign-in">Login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create free account
            </h1>
            <p className="text-sm text-muted-foreground">
              Be a partner and start your sales!
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restaurant name</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Your name</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Your phone</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finish registration
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              By continuing, you agree to our{' '}
              <a className="underline underline-offset-4" href="">
                terms of service
              </a>{' '}
              and{' '}
              <a className="underline underline-offset-4" href="">
                privacy policies
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
