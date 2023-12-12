import { Link } from "react-router-dom";

function Country({ /*image,*/ name, index }) {
  const gradients = ['--gradient1', '--gradient2', '--gradient3', '--gradient4', '--gradient5','--gradient6'];
  const gradient = gradients[index % gradients.length];
  return (
    <article className="country-container">
      <Link to={`/countries/${name.toLowerCase()}`} className="country-link">
      <div className="country-card" style={{background: `var(${gradient})`}}>
        
          {/* <div className="country-image-container"> */}
            {/* <img src={image} className="country-img" alt={name} /> */}
            <div className="country-footer">
            <h3>{name}</h3>
          </div>
          {/* </div> */}
          
        
      </div>
      </Link>
    </article>
  );
}

export default Country;
