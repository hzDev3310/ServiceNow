"use client"
import moment from 'moment';
import AppButton from "./AppButton"
import ExpandableText from "./ExpandableText"

const AppCard = ({report}) => {
  return (
   <tr  className="bg-white w-32 border-b dark:bg-gray-800 dark:border-gray-700">
   <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {report?._id}
   </td>
   <td className="px-6 py-4">
   {report?.userId}
   </td>
   <td className="px-6 py-4">
   {report?.providerId}
   </td>
   <td className="px-6 py-4 flex items-center h-32 ">
   <ExpandableText>{report?.content}</ExpandableText>
   </td>
   <td className="px-6 py-4 ">
   {moment(report.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
   </td>
   <td className="px-6 py-4 ">
   <AppButton style={{background : "red"}} >delete</AppButton>
   </td>
 
</tr>
  )
}

export default AppCard
