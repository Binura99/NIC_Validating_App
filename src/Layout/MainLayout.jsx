import { Header } from '../Components/Header';
// import { Footer } from '../Components/Footer';
import { Outlet } from 'react-router-dom';


export const MainLayout = () => {
  return (
    <div className='w-full h-full'>

        <Header/>
        <Outlet/>
        {/* <Footer/> */}

    </div>
  )
};