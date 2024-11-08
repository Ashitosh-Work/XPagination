import { useEffect, useState } from "react";
import "./TableComponent.css"

function RowComponent({ employee }) {
    return (
        <>
            <tr>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
            </tr>
        </>
    )
}

export default function TableComponent() {

    const URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    const [data, setData] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [noOfPages, setNoOfPages] = useState(0);

    const previousHandler = () => {
        if (pageNo !== 1) {
            setPageNo(prev => prev - 1);
        }
    }

    const nextHandler = () => {
        if (pageNo < noOfPages) {
            setPageNo(prev => prev + 1);
        }
    }

    useEffect(() => {
        const call = async () => {
            try {
                let res = await fetch(URL);
                let data = await res.json();
                let noOfPages = Math.ceil(data.length / 10);
                setNoOfPages(noOfPages);
                setData(data);
            }
            catch {
                alert("Error fetching data");
            }
        }
        call();
    }, [])

    return (
        <div >
            <h1>Employee Data Table</h1>
            <div >
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((employees, index) => ((pageNo - 1) * 10) <= index && index <= ((pageNo * 10) - 1))
                            .map(employee => < RowComponent employee={employee} key={employee.id} />)}
                    </tbody>
                </table>
            </div>
            <div className="paginate">
                <button onClick={() => previousHandler()}>Previous</button>
                <p>{pageNo}</p>
                <button onClick={() => nextHandler()}>Next</button>
            </div>
        </div>
    )

}