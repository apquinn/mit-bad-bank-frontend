import "bootstrap/dist/css/bootstrap.css";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Nav from "react-bootstrap/Nav";

export default function NavbarItem({ message, link, title }) {
  return (
    <>
      <Nav.Link id={link} href={"#/" + link + "/"}>
        {title}
      </Nav.Link>
    </>
  );
}
