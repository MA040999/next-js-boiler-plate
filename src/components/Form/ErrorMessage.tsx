type ErrorMessageProps = {
    message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p role="alert" className="text-sm mt-1 text-red-500">{message}</p>
  )
}

export default ErrorMessage