type ErrorMessageProps = {
    message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p role="alert" className="text-sm text-input-error">{message}</p>
  )
}

export default ErrorMessage