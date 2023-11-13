
import PageLink from './PageLink'

const PageLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass} id='nav-links'>
        <PageLink link={{ id: 1, href: '#home', text: 'Home' }} itemClass={itemClass} />
        <PageLink link={{ id: 2, href: '#courses', text: 'Courses' }} itemClass={itemClass} />
        <PageLink link={{ id: 3, href: '#users', text: 'Users' }} itemClass={itemClass} />
    </ul>
  )
}
export default PageLinks