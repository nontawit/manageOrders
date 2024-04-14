import {Carousel} from "react-bootstrap"

function CarouselCard({ orders }){
    return(
        <Carousel>
            {orders.map(order => (
                <Carousel.Item key={order._id}>
                    <div>
                        <h3>ลูกค้า: {order.cusName}</h3>
                        <p>ที่อยู่: {order.cusAddress}</p>
                        <p>{order.orderUnit} ชุด</p>
                        <p> ส่ง: {order.dateDelivery}</p>
                        <p>สถานะ: {order.orderStatus}</p>    
                        {order.orderDate}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselCard;