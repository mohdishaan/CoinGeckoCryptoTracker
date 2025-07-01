import { ErrorBoundary } from "react-error-boundary"

function CustomErrorBoundaryUI({error , resetErrorBoundary}){
    return(
        <div className="h-[100vh] flex justify-center items-center px-6 ">
            <div role="alert" className="alert alert-error">
                <p>Something went Wrong</p>
                <pre>{error?.message}</pre>
                <button className="cursor-pointer btn btn-outline btn-sm" onClick={resetErrorBoundary}>Try Again</button>
            </div>
        </div>
    )
}

export default function CustomErrorBoundary({children}){
    return(
        <ErrorBoundary FallbackComponent={CustomErrorBoundaryUI}  onReset={() => window.location.reload()  }>
            {children}

        </ErrorBoundary>
    )
}