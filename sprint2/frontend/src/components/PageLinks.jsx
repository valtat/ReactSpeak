import Button from "./Button";

const PageLinks = (props) => {
  return (
    <ul>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <a href="/">Home</a>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <a href="/courses">Courses</a>
        </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <a href="/users">Users</a>
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Button name="Log in" />
      </li>
      <li onClick={() => props.isMobile && props.closeMobileMenu()}>
        <Button name="Register" />
      </li>
    </ul>
  );
};
export default PageLinks;
