import { Spinner } from '@chakra-ui/react'

export default function Loading() {

  return (
    <div className="flex flex-col gap-y-5 items-center justify-center min-h-[90vh] w-full">
      <Spinner
        className="w-17 h-17 text-primary"
        data-testid="loading"
      />
    </div>
  )

}