import React, { ReactNode } from "react";
import { Interface } from "readline";
import "./cardlayout.css";

interface IPropsCardLayout {
  title: string;
  cardHeight?: string;
  children?: ReactNode;
  buttonText?: string;
  buttonColor?: string;
  submitPost: (e: any) => void;
  closeButton?: () => void;
  closeButtonText?: string;
}

const CardLayout = ({
  children,
  title,
  cardHeight,
  buttonText,
  buttonColor,
  submitPost,
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
        <button
          type="submit"
          name="btnSubmit"
          style={{ color: buttonColor }}
          className="btn btn-success"
          value="Sign In"
          onClick={(e) => submitPost(e)}
        >
          {buttonText}
        </button>

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
