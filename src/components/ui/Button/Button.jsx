import clsx from "clsx";
import { Link } from "react-router-dom";
import "./Button.scss";
const Button = ({
  as,
  iconLeft,
  iconRight,
  text,
  link,
  disabled,
  onClick,
}) => {
  const classes = clsx(
    "btn",
    "hover:shadow-button",
    {
      "opacity-50 pointer-events-none": disabled,
    },
  );
  if (as === "button") {
    return (
      <button className={classes} disabled={disabled} onClick={onClick}>
        {iconLeft && <span className="icon-left">{iconLeft}</span>}
        {text && <span className="btn-text">{text}</span>}
        {iconRight && <span className="icon-right">{iconRight}</span>}
      </button>
    );
  }

  if (as === "link" && link) {
    return (
      <Link
        to={link}
        className={classes}
        aria-disabled={disabled ? "true" : "false"}
        role="button"
      >
        {iconLeft && <span className="flex items-center justify-center icon-left">{iconLeft}</span>}
        {text && <span className="btn-text">{text}</span>}
        {iconRight && <span className="flex items-center justify-center icon-right">{iconRight}</span>}
      </Link>
    );
  }
};

export default Button;
