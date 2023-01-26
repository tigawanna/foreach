import React from 'react';
import { Link } from 'react-router-dom';

interface SignupProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user?: {};
}

export const Signup = () => (
  // const navigate = useNavigate()
  // React.useEffect(() => {
  //   if (user?.email) {
  //     navigate('/profile')
  //   }
  // }, [user?.email])

  // eslint-disable-next-line implicit-arrow-linebreak
  (<div className="w-full h-[80%] flex flex-col items-center justify-center">
    <div
      className="w-[80%] h-fit md:w-[60%]  m-2 flex flex-col
    items-center justify-center "
    />
    <Link to="/auth" className="text-blue-500">
      Already have an account?, go to login
    </Link>
  </div>)
);
