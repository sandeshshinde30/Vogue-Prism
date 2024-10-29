import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faUsers } from '@fortawesome/free-solid-svg-icons';
import config from '../config';

function Dashboard() {

    const [productCount,setproductCount] = useState(0);
    const [userCount,setuserCount] = useState(0);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProductsCount = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/api/getProductsCount`);
                if (!response.ok) {
                    throw new Error("Failed to fetch trending products.");
                }
                const data = await response.json();
                setproductCount(data);
            } catch (error) {
                console.error("Error fetching trending products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductsCount();

        const fetchVisitCount = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/api/track-visit`);
                const data = await response.json();
                setuserCount(data.count);
            } catch (error) {
                console.error('Error fetching visit count:', error);
            }
        };

        fetchVisitCount();
    }, []);

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <>
            {/* <h1 className="p-11 pb-0 text-xl capitalize">Welcome to admin dashboard !</h1> */}
            <div className="p-12 flex">
                <div className="w-80 h-44 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md mr-12 p-[35px] flex flex-col justify-center relative    ">
                    <p className="text-white text-[25px]">Collections</p>
                    <p className="text-white text-[45px]">{productCount}+</p>
                    <FontAwesomeIcon icon={faFolder} className="text-white text-5xl absolute top-10 right-10" />
                </div>
                <div className="w-80 h-44 bg-gradient-to-r from-green-500 to-green-600 rounded-md mr-12 p-[35px] flex flex-col justify-center relative">
                    <p className="text-white text-[25px]">Users</p>
                    <p className="text-white text-[45px]">{userCount}+</p>
                    <FontAwesomeIcon icon={faUsers} className="text-white text-5xl absolute top-10 right-10" />
                </div>
            </div>
            <div className='p-11 pt-0 w-[900px]'>   
                <img src="../graph.png" alt="" className='w-[100%] h-[100%]'/>
            </div>
        </>
    )
}

export default Dashboard;