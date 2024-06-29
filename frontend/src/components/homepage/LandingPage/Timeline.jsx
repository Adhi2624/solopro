import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import './Timeline.css'

export default function Timeline() {
  return (
    <MDBContainer fluid className="py-5">
      <MDBRow>
        <MDBCol lg="12">
          <div className="horizontal-timeline">
            <MDBTypography listInLine className="items">
              <li className="items-list">
                <div className="px-5">
                  <div className="event-date badge">Step-1</div>
                  <div className="text">
                    <h5 className="pt-2">Sign Up</h5>
                    <p className="text1" style={{ color: 'white' }}>
                    Get started by becoming part of our dynamic community with an easy sign-up process.                    </p>
                  </div>
                </div>
              </li>
              <li className="items-list">
                <div className="px-5">
                  <div className="event-date badge">Step-2</div>
                  <div className="text">
                    <h5 className="pt-2">Tell Us About Yourself</h5>
                    <p className="text1" style={{ color: 'white' }}>
                      Share your story so we can create a personalized experience tailored just for you.
                    </p>
                  </div>
                </div>
              </li>
              <li className="items-list">
                <div className="px-5">
                  <div className="event-date badge">Step-3</div>
                  <div className="text">
                    <h5 className="pt-2">Select Your Preferences</h5>
                    <p className="text1" style={{ color: 'white' }}>
                      Pick what you love to ensure your journey is filled with your favorite things.
                    </p>
                  </div>
                </div>
              </li>
              <li className="items-list">
                <div className="px-5">
                  <div className="event-date badge">Step-4</div>
                  <div className="text">
                    <h5 className="pt-2">You're All Set!</h5>
                    <p className="text1" style={{ color: 'white' }}>
                      Dive in and explore a world designed specifically to match your unique interests.
                    </p>
                  </div>
                </div>
              </li>
            </MDBTypography>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
