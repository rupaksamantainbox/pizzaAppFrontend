import { useDispatch, useSelector } from "react-redux"
import PizzaLogo from "../assets/images/pizza1.png"
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/AuthSlice";
import CartIcon from "../assets/images/cart.svg"
import { useEffect } from "react";
import { getCartDetails } from '../redux/slices/CartSlice';

function Layout({children}){

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cartsData} = useSelector((state) => state.cart)
  //console.log(isLoggedIn)

  async function handleLogout(e) {
    e.preventDefault()
    //console.log(typeof isLoggedIn)
    if(isLoggedIn){
      dispatch(logout())
    }
  }

  async function fetchCartDetails() {
    const res = await dispatch(getCartDetails());
    console.log("cart details", res)
    if(res?.payload?.isUnauthorized) {
        console.log("unauthorized");
        dispatch(logout());
    }
  }

  useEffect(() => {
      //console.log(typeof(isLoggedIn))
      if(isLoggedIn) {
          fetchCartDetails();
      }
  }, []);


    return (
        <div>
            <nav className='flex items-center justify-around h-16 text-[#687280] font-mono border-none shadow-md'>
                <div className='flex items-center justify-center'
                onClick={() => navigate('/')}>
                    <p >Pizza App</p>
                    <img src={PizzaLogo} alt="Pizza" />
                </div>
                <div className="hidden md:block">
                    <ul className='flex gap-4'>
                        <li className='hover:text-[#FF9110]'>
                            {' '}
                            <p>Menu</p>
                        </li>
                        <li className='hover:text-[#FF9110]'>
                            {' '}
                            <p>Services</p>
                        </li>
                        <li className='hover:text-[#FF9110]'>
                            {' '}
                            <p>About</p>
                        </li>
                    </ul>
                </div>

                <div>
                  <ul className="flex gap-4">
                    <li className="hover:text-[#ff9110]">
                      {isLoggedIn == true ? (
                        <Link onClick={handleLogout}>Logout</Link>
                      ):(
                        <Link to={'/auth/login'}>Login</Link>
                      )}
                    </li>
                    {isLoggedIn && (
                            <Link to={'/cart'}>
                                <li>
                                    <img src={CartIcon} className='w-8 h-8 inline' />
                                    {' '}
                                    <p className='text-black inline'>{cartsData?.items?.length}</p>
                                </li>
                            </Link>
                            
                        )}
                  </ul>
                </div>

            </nav>

                {children}
                
            <footer className="text-gray-600 body-font ">
                <div className="bg-gradient-to-r from-amber-50 to-orange-300">
                  <div className="container flex flex-col flex-wrap px-5 py-10 mx-auto sm:flex-row">
                    <p className="text-sm text-center text-gray-500 sm:text-left">
                        &copy; 2024 Pizza App                    
                      <a
                        href="https://twitter.com/knyttneve"
                        rel="noopener noreferrer"
                        className="ml-1 text-gray-600"
                        target="_blank"
                      >
                        @pizza-apps
                      </a>
                    </p>
                    <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                      <a className="text-[#FF9110] hover:text-[#ff8f1077]">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                      </a>
                      <a className="ml-3 text-[#FF9110] hover:text-[#ff8f1077]">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                      <a className="ml-3 text-[#FF9110] hover:text-[#ff8f1077]">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                        </svg>
                      </a>
                      <a className="ml-3 text-[#FF9110] hover:text-[#ff8f1077]">
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="0"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="none"
                            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                          ></path>
                          <circle cx="4" cy="4" r="2" stroke="none"></circle>
                        </svg>
                      </a>
                    </span>
                  </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout