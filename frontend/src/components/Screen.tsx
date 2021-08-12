import { ReactNode, FC } from 'react';
import '../styles/screen.scss';

type Props = {
  children?: ReactNode;
};

export const Screen: FC = ({ children }: Props) => (
  <div className="screen">{children}</div>
);
