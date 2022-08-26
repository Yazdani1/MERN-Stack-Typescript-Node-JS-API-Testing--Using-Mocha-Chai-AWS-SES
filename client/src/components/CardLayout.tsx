import React, { ReactNode } from "react";
import { Interface } from "readline";
import "./cardlayout.css";

interface IPropsCardLayout {
  title: string;
  cardHeight?: string;
  children?: ReactNode;
  buttonText?: string;
  buttonColor?: string;
  closeButton?: () => void;
  closeButtonText?: string;
}

const CardLayout = ({
  children,
  title,
  cardHeight,
  buttonColor,
  closeButton,
  closeButtonText,
}: IPropsCardLayout) => {
  return (
    <div className="card-layout-design" style={{ height: cardHeight }}>
      <h5>{title}</h5>
      {children}

      <div
        className="form-group justify-content-center align-items-center"
        style={{ marginLeft: "40px" }}
      >
       

        {closeButton && (
          <button
            type="submit"
            name="btnSubmit"
            style={{ color: buttonColor }}
            className="btn btn-danger"
            value="Sign In"
            onClick={closeButton}
          >
            {closeButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardLayout;
