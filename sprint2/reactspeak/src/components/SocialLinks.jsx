import SocialLink from "./SocialLink";

const SocialLinks = ({parentClass, itemClass}) => {
  return (
    <ul className={parentClass}>
        <SocialLink link={{ id: 0, href: 'http://tiktok.com', icon: 'fab fa-tiktok' }} itemClass={itemClass} />
        <SocialLink link={{ id: 1, href: 'http://facebook.com', icon: 'fab fa-facebook-f' }} itemClass={itemClass} />
        <SocialLink link={{ id: 2, href: 'http://twitter.com', icon: 'fab fa-twitter' }} itemClass={itemClass} />
        <SocialLink link={{ id: 3, href: 'http://instagram.com', icon: 'fab fa-instagram' }} itemClass={itemClass} />
        <SocialLink link={{ id: 4, href: 'http://youtube.com', icon: 'fab fa-youtube' }} itemClass={itemClass} />
    </ul>
  );
};

export default SocialLinks;