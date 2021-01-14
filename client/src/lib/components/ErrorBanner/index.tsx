import { Alert } from 'antd';

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({
  message = 'Something went wrong',
  description = 'Looks like omething went wrong, please check your connection and/or try again later',
}: Props) => {
  return (
    <Alert
      banner
      closable
      message={message}
      description={description}
      type='error'
      className='error-banner'
    />
  );
};
