import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Player } from '@lottiefiles/react-lottie-player';

const NotFoundPage = () => {
  return (
    <div style={{ backgroundColor: '#040F15', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <section className="bg-light">
        <div className="container-fluid" style={{ backgroundColor: '#040F15' }}>
          <div className="row row-cols-1 justify-content-center py-5">
            <div className="col-xxl-7 mb-4">
              <div className="lc-block">
                <Player
                  src="https://assets9.lottiefiles.com/packages/lf20_u1xuufn3.json"
                  className="mx-auto"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                />
              </div>
            </div>
            <div className="col text-center">
              <div className="lc-block mb-4">
                <p className="rfs-11" style={{ color: 'white' }}>
                  The page you are looking for was moved, removed or might never existed.
                </p>
              </div>
              <div className="lc-block">
                <a className="btn btn-lg btn-primary" href="#" role="button">
                  Back to homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
