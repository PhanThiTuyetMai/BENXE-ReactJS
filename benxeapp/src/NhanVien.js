import React from "react";
import API, { endpoints } from "./configs/API";

class NhanVien extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nhanVien: null,
            loading: true,
            error: null
        }
    }

    componentDidMount(){
        API.get(endpoints['nhanvien']).then(respone => {
            this.setState({
                nhanVien: respone.data.results || [],
                loading: false
            });
            console.log(respone.data.results);
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            });
        });
    }

    render() {
        const {nhanVien, loading, error} = this.state;

        if(loading) return <p>Loading...</p>
        if(error) return <p>Error: {error.message}</p>

        return(
           <div>
            <h1>Thông tin nhân viên</h1>
            {nhanVien.length > 0 ? (
                nhanVien.map((nv, index) => (
                    <div key={index}>
                        <p>Tên: {nv.Ten_NV}</p>
                        {/* Thêm các trường thông tin khác nếu cần */}
                        <hr />
                    </div>
                ))
            ) : (
                <p>Không có thông tin nhân viên nào.</p>
            )}
           </div>
        )
    }
}

export default NhanVien