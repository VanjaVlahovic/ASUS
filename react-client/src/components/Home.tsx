import logo from '../slike/asus2.png';
const Home = ()=>(
      <div className="home">
        <div className="container">
          <div className="row align-items-center my-5">
            <div className="col-lg-7">
              <img
                className="img-fluid rounded mb-4 mb-lg-0"
                src={logo}
                alt="http://placehold.it/900x400"
              />
            </div>
            <div className="col-lg-5">
              <h1 className="font-weight-light">Asus</h1>
              <p>
              Asus je konkurentna Tajvanska kompanija prisutna na globalnom 
              tržištu koja se bavi proizvodnjom i prodajom računara, mobilnih 
              uređaja, kao i raznovrsne IT opreme. 
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  
  export default Home;