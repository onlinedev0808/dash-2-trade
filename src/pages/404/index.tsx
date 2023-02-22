function PageNotFound() {
  return (
    <>
      <style>{`
        html,
        body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <div className="">
        <div className="text-6xl">404</div>
        <div>Page not found</div>
      </div>
    </>
  );
}

export default PageNotFound;

PageNotFound.hasNoLayout = true;
