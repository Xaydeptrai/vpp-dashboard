const formatDate = (dateString: string): string => {
    const date = new Date(dateString); // Chuyển đổi chuỗi ngày thành đối tượng Date
    const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0) và thêm số 0 nếu cần
    const year = date.getFullYear(); // Lấy năm
    return `${day}-${month}-${year}`; // Trả về định dạng dd-mm-yyyy
};