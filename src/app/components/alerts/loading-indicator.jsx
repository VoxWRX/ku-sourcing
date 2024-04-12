const LoadingIndicator = () => {
    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-75 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
};

export default LoadingIndicator;
