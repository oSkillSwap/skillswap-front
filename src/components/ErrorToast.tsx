import { Info } from 'lucide-react';
import './ErrorToast.scss';

interface IErrorToastProps {
  errors: string[] | string;
}

function ErrorToast({ errors }: IErrorToastProps) {
  return Array.isArray(errors) ? (
    <ul className="toast-alert">
      <Info />
      <div className="toast-alert-list">
        {errors.map((errMsg) => (
          <li key={errMsg}>{errMsg}</li>
        ))}
      </div>
    </ul>
  ) : (
    <p className="toast-alert">
      <Info /> {errors}
    </p>
  );
}

export default ErrorToast;
