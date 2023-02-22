/* eslint-disable  react/no-unknown-property */

function ServerError() {
  return (
    <>
      <style global jsx>{`
        html,
        body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <div>Error 500: Something went wrong on the server side</div>
    </>
  );
}

export default ServerError;

ServerError.hasNoLayout = true;

