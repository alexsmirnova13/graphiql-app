import { Button } from '@mantine/core';
import React, { ErrorInfo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;
    if (onError) {
      onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h3>Something went wrong.</h3>
          <Button variant="outline" onClick={() => <Navigate to="/" />}>
            Go to welcome page!
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
