"use client"
import useGet from "../src/api/useGet";
import AppBadge from "../src/components/AppBadge";
import AppLoading from "../src/components/AppLoading";
import BarChart from "../src/components/BarChart";
import DonutChart from "../src/components/DonutChart";
import LeftBar from "../src/components/LeftBar";



export default function Home() {
  const { data, error, isLoading } = useGet()

  const seriesData = [
    {
      name: 'clients',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
  

  ];
  const categoriesData = ['kairouan', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const chartTitle = 'Monthly Revenue and Profit';

  if (error) {
    return <div className="flex w-screen h-screen justify-center items-center text-danger" >check your internt connexion</div>
  }

  else {
    return (
      <>

        <div >
          {isLoading ?
            <AppLoading /> : <div className="flex">

              <div className="w-[20%]">
                <LeftBar />
              </div>
              <div className="w-[80%]">
              <div className="flex w-full h-[100vh] justify-center items-center">
             
              <div className="flex flex-col mr-5 space-y-5">
                <AppBadge classname="flex flex-col justify-center items-center rounded-xl  w-[300px] h-[300px]">
                  <h1 className=" text-primary text-7xl font-semibold " >{data?.totalUsers}</h1>
                  <br />
                  <h1 className="font-semibold capitalize" >total users</h1>
                </AppBadge>
                <AppBadge classname="flex flex-col justify-center items-center rounded-xl w-[300px] h-[300px] ">
                  <h1 className=" text-primary text-7xl font-semibold " >{data?.reports}</h1>
                  <br />
                  <h1 className="font-semibold capitalize" >reports</h1>
                </AppBadge>
                <AppBadge classname="flex flex-col justify-center items-center rounded-xl w-[300px] h-[300px] ">
                  <h1 className=" text-primary text-7xl font-semibold " >{data?.admins}</h1>
                  <br />
                  <h1 className="font-semibold capitalize" >admins</h1>
                </AppBadge>
              </div>
              <div>

                <div className="flex  space-x-5 mb-5">
                  <AppBadge classname="flex flex-col justify-center items-center rounded-xl w-[400px] h-[300px] ">
                    <DonutChart colors={["purple", "#eeeeee"]} series={data?.users|| [100,0]} >
                    </DonutChart>
                    <br />
                    <h1 className="font-semibold capitalize " >clients</h1>
                  </AppBadge>
                  <AppBadge classname="flex flex-col justify-center items-center rounded-xl  w-[400px] h-[300px] ">
                    <DonutChart colors={["blue", "#eeeeee"]} series={data?.providers||[100,0]} >
                    </DonutChart>
                    <br />
                    <h1 className="font-semibold capitalize" >providers</h1>
                  </AppBadge>
                </div>

                <AppBadge classname="flex flex-col justify-center items-center rounded-xl  w-[820px] h-[620px] ">
                  <BarChart series={data?.usersValue ||seriesData} categories={data?.cities.slice(0,8) || categoriesData} title={chartTitle} />
                  
                </AppBadge>

                {/* Third row */}
              </div>


            </div>
              </div>
            </div>}

        </div>
      </>

    )
  }

}
