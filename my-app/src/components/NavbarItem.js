import "bootstrap/dist/css/bootstrap.css";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function NavbarItem({ message, link, title }) {
  return (
    <>
      <OverlayTrigger
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => <Tooltip {...props}>{message}</Tooltip>}
        placement="bottom"
      >
        <li className="nav-item">
          <a id={link} className="nav-link" href={"#/" + link + "/"}>
            {title}
          </a>
        </li>
      </OverlayTrigger>
    </>
  );
}
