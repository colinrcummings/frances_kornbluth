/* eslint-disable default-case */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  Toast as ReactstrapToast,
  ToastHeader as ReactstrapToastHeader,
  ToastBody as ReactstrapToastBody,
} from 'reactstrap';
import { colors, typography } from '../../styles';
import { NotificationType, INotification } from '../../types';

interface INotificationProps {
  notification: INotification;
  dismiss: () => void;
}

const getIcon = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.Success:
      return 'success';
    case NotificationType.Error:
      return 'danger';
  }
};

const getHeading = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.Success:
      return 'Success';
    case NotificationType.Error:
      return 'Error';
  }
};

export const Notification: React.FC<INotificationProps> = ({
  notification,
  dismiss,
}) => {
  const { type, heading, text } = notification;

  useEffect(() => {
    if (type === NotificationType.Success) {
      setTimeout(dismiss, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Toast>
      <ToastHeader icon={getIcon(type)} toggle={dismiss}>
        {heading || getHeading(type)}
      </ToastHeader>
      <ToastBody>{text}</ToastBody>
    </Toast>
  );
};

const Toast = styled(ReactstrapToast)`
  font-family: ${typography.default};
  min-width: 288px;
`;

const ToastHeader = styled(ReactstrapToastHeader)`
  color: ${colors.darkGray};
`;

const ToastBody = styled(ReactstrapToastBody)`
  color: ${colors.black};
`;
