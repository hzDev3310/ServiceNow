"use client"
import moment from 'moment';
import useGet from '../../src/api/useGet'
import useDelete from '../../src/api/useDelete'
import LeftBar from '../../src/components/LeftBar'
import Swal from 'sweetalert2'
import AppInput from '../../src/components/AppInput'
import ExpandableText from '../../src/components/ExpandableText'
import AppButton from '../../src/components/AppButton'
import AppLoading from '../../src/components/AppLoading'
import { useEffect, useRef, useState } from 'react'

const Reports = () => {
    const { isLoading, handleDelete, responseData, error } = useDelete()
    const { data, isLoading: loadingReport } = useGet('/reports', [responseData])
    const [reports, setReports] = useState(null)
    const [id, setId] = useState("")

    useEffect(() => {
        if (!id) {
            setReports(data);
        } else {
            const filteredReports = data?.filter(report => (report.userId === id|| report.providerId === id));
            setReports(filteredReports);
        }
    }, [data, id]);

    const deleteReport = (id) => {
        handleDelete("/reports/" + id)
    }

    useEffect(() => {
        responseData?.message && Swal.fire({
            title: "Good job!",
            text: "report removed successfully",
            icon: "ok"
        });
        error && alert(error)
    }, [responseData, error])

    const userId = useRef(null);
    const providerId = useRef(null);

    const copyToClipboard = (ref, label) => {
        const value = ref.current.innerText;
        const tempInput = document.createElement('input');
        tempInput.value = value;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        Swal.fire({
            position: "button-end",
            icon: "success",
            title: label,
            showConfirmButton: false,
            timer: 1500
        });
    };
    return (
        <div className='w-screen h-screen flex' >
            
            <LeftBar />
            {(isLoading || loadingReport) ? <AppLoading /> :
                <div className='ml-[25%] w-[75%] flex flex-col  items-center p-12 pt-20'>
                    <div className='w-[80%]' >
                        <AppInput placeholder='search for a user'  value={id} onChange={(e)=>setId(e.target.value)} />
                    </div>
                    <table class="rounded-xl  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 w-32 py-3">
                                    id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    sender
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    about
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    content
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports?.map((report, index) => (

                                <tr key={index} className="bg-white w-32 border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {report?._id}
                                    </td>
                                    <td className="px-6 py-4" >
                                        <button onClick={()=>copyToClipboard(userId, "sender Id copied to clipboard!")} >
                                            <p ref={userId}>
                                                {report?.userId}
                                            </p>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4" ref={providerId}>
                                    <button onClick={()=>copyToClipboard(providerId, "reciver Id copied to clipboard!")} >
                                            <p ref={providerId}>
                                                {report?.providerId}
                                            </p>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 flex items-center h-32 ">
                                        <ExpandableText>{report?.content}</ExpandableText>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {moment(report.createdAt).format('DD/MM/YYYY, h:mm ')}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <AppButton onClick={() => deleteReport(report._id)} >delete</AppButton>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>}
        </div>

    )
}

export default Reports
