import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <h1 style={styles.title}>⚠️ Oops! Something went wrong</h1>
            <p style={styles.message}>
              We're sorry for the inconvenience. The application encountered an
              unexpected error.
            </p>
            <button
              style={styles.button}
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
            <button
              style={styles.buttonSecondary}
              onClick={() => (window.location.href = "/")}
            >
              Go to Home
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details</summary>
                <pre style={styles.pre}>
                  {this.state.error.toString()}
                  {"\n"}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  content: {
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  message: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  button: {
    backgroundColor: "#6366f1",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: "12px",
    transition: "background-color 0.2s",
  },
  buttonSecondary: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  details: {
    marginTop: "24px",
    textAlign: "left",
    backgroundColor: "#fef2f2",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #fecaca",
  },
  summary: {
    cursor: "pointer",
    fontWeight: "600",
    color: "#dc2626",
    marginBottom: "8px",
  },
  pre: {
    fontSize: "12px",
    color: "#991b1b",
    overflow: "auto",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
};

export default ErrorBoundary;
