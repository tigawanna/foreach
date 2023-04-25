interface ClientSideLoadingProps {}

const ClientSideLoading = ({}: ClientSideLoadingProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-5 animate-pulse"></div>
  );
};

export default ClientSideLoading;
